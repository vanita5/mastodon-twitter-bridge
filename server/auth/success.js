// @flow
/* eslint camelcase: 0 */
import Mastodon from 'mastodon-api';
import Twit from 'twit';
import UUID from 'uuid-js';

type NewAuthArgs =
    | {
          type: 'twitter',
          auth: TwitterAuthData,
      }
    | {
          type: 'mastodon',
          auth: MastodonAuthData,
      };

export async function newAuth(session: any, n: NewAuthArgs) {
    const userData = await (n.type === 'twitter' ? getTwitterUserData(n.auth) : getMastodonUserData(n.auth));

    let existingUser;
    if (session.user) {
        console.log(session);
        existingUser = await db.findOne({
            _id: session.user,
        });
    } else {
        existingUser = await db.findOne({
            [`${n.type}.auth`]: {
                $elemMatch: n.auth,
            },
        });
    }

    let userId;

    const user = { auth: n.auth, userData };

    if (existingUser) {
        userId = existingUser._id;
        await db.update(
            { _id: userId },
            {
                $addToSet: {
                    [n.type]: user,
                },
                $set: {
                    'config.defaultMastodonInstance': n.type === 'mastodon' ? n.auth.instance_url : undefined,
                },
            },
            {}
        );
    } else {
        const newId = session.user || UUID.create().toString();
        await db.insert({
            _id: newId,
            twitter: n.type === 'twitter' ? [user] : [],
            mastodon: n.type === 'mastodon' ? [user] : [],
            config: {
                defaultMastodonInstance: n.type === 'mastodon' ? n.auth.instance_url : undefined,
            },
            connections: [],
        });
        userId = newId;
    }

    if (!session.user && true) {
        session.user = userId;
        await new Promise((resolve, reject) => {
            session.save(err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}

async function getTwitterUserData(auth: TwitterAuthData): Promise<?AccountData> {
    const T = new Twit(auth);
    const { data } = await T.get('account/verify_credentials', {});
    if (!data || data.errors) {
        return;
    }
    return {
        name: data.name,
        screenName: data.screen_name,
        protected: data.protected,
        profileImage: data.profile_image_url_https.replace('_normal.', '.'),
        backgroundImage: data.profile_banner_url,
        id: data.id_str,
    };
}

async function getMastodonUserData(auth: MastodonAuthData): Promise<?AccountData> {
    const M = new Mastodon({
        api_url: auth.api_url,
        access_token: auth.access_token,
    });
    const { data } = await M.get('accounts/verify_credentials', {});
    console.log('data', data);
    if (!data || data.errors) {
        return;
    }
    return {
        name: data.username,
        screenName: `${data.acct}@${auth.instance_url}`,
        protected: data.locked,
        profileImage: data.avatar,
        backgroundImage: data.header,
        id: String(data.id),
    };
}
