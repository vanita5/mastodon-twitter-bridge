// @flow
/* eslint camelcase: 0 */
import crypto from 'crypto';
import Mastodon from 'mastodon-api';
import notify from '../notify';
import Twit from 'twit';
import UUID from 'uuid-js';

type NewAuthArgs =
    | {
          type: 'twitter',
          auth: TwitterAuthData,
          permission: Permission,
      }
    | {
          type: 'mastodon',
          auth: MastodonAuthData,
          permission: Permission,
          instance_url: string,
      };

export async function newAuth(req: any, res: any, n: NewAuthArgs) {
    const accountData = await (n.type === 'twitter'
        ? getTwitterAccountData(n.auth, n.permission)
        : getMastodonAccountData(n.auth, n.permission, n.instance_url));

    if (!accountData) {
        res.redirect(302, notify('112'));
        return;
    }

    let existingUser;
    if (req.session.user) {
        console.log(req.session);
        [existingUser] = await db.findOne({
            _id: req.session.user,
        });
    } else {
        [existingUser] = await db.findOne({
            [`${n.type}.${accountData.id}`]: {
                $exists: true,
            },
        });
    }

    let userId;

    const user = { auth: n.auth, accountData };

    if (existingUser) {
        userId = existingUser._id;
        await db.update(
            { _id: userId },
            {
                $set: {
                    [`${n.type}.${accountData.id}`]: user,
                    'config.defaultMastodonInstance': n.type === 'mastodon'
                        ? n.instance_url
                        : existingUser.config.defaultMastodonInstance,
                },
            },
            {}
        );
    } else {
        const newId = req.session.user || UUID.create().toString();
        await db.insert({
            _id: newId,
            twitter: n.type === 'twitter' ? { [accountData.id]: user } : {},
            mastodon: n.type === 'mastodon' ? { [accountData.id]: user } : {},
            config: {
                defaultMastodonInstance: n.type === 'mastodon' ? n.instance_url : undefined,
            },
            connections: {},
        });
        userId = newId;
    }

    if (!req.session.user) {
        req.session.user = userId;
        await new Promise((resolve, reject) => {
            req.session.save(err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    //success
    res.redirect(302, notify(n.type === 'twitter' ? '010' : '011'));
}

async function getTwitterAccountData(
    auth: TwitterAuthData,
    permission: Permission
): Promise<?TwitterAccountData> {
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
        permission,
        id: data.id_str,
    };
}

async function getMastodonAccountData(
    auth: MastodonAuthData,
    permission: Permission,
    instanceUrl: string
): Promise<?MastodonAccountData> {
    const M = new Mastodon(auth);
    const apiURLHash = crypto.createHash('sha1');
    apiURLHash.update(auth.api_url, 'utf8');
    const hashedApiURL = apiURLHash.digest('hex');
    const { data } = await M.get('accounts/verify_credentials', {});
    console.log('data', data);
    if (!data || data.errors) {
        return;
    }
    return {
        name: data.username,
        screenName: `${data.acct}`,
        permission,
        instanceUrl,
        protected: data.locked,
        profileImage: data.avatar,
        backgroundImage: data.header,
        id: `${hashedApiURL}_${String(data.id)}`,
    };
}
