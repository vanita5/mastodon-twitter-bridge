// @flow
import Mastodon from 'mastodon-api';
import Twit from 'twit';
import UUID from 'uuid-js';

export async function newAuth(session: any, type: 'twitter' | 'mastodon', auth: AuthData) {
    const userData = await (type === 'twitter' ? getTwitterUserData(auth) : getMastodonUserData(auth));

    let existingUser;
    if (session.user) {
        console.log(session);
        existingUser = await db.findOne({
            _id: session.user,
        });
    } else {
        existingUser = await db.findOne({
            [`${type}.auth`]: {
                $elemMatch: auth,
            },
        });
    }

    let userId;

    const user = { auth, userData };

    if (existingUser) {
        userId = existingUser._id;
        await db.update(
            { _id: userId },
            {
                $addToSet: {
                    [type]: user,
                },
            },
            {}
        );
    } else {
        const newId = session.user || UUID.create().toString();
        await db.insert({
            _id: newId,
            twitter: type === 'twitter' ? [user] : [],
            mastodon: type === 'mastodon' ? [user] : [],
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

async function getTwitterUserData(auth: AuthData): Promise<?UserData> {
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

async function getMastodonUserData(auth: AuthData): Promise<?UserData> {
    const M = new Mastodon(auth);
    const { data } = await M.get('account/verify_credentials', {});
    console.log('data', data);
    if (!data || data.errors) {
        return;
    }
    return {
        name: data.display_name,
        screenName: data.acct,
        protected: data.locked,
        profileImage: data.avatar,
        backgroundImage: data.header,
        id: String(data.id),
    };
}

export async function getAccounts(id?: string): Promise<Accounts> {
    console.log(id);
    if (!id) {
        return { loggedIn: false };
    }
    const user = await db.findOne({ _id: id });
    console.log(user);
    if (!user) {
        return { loggedIn: false };
    }
    return {
        loggedIn: true,
        mastodon: user.mastodon.map(a => a.userData),
        twitter: user.twitter.map(a => a.userData),
    };
}
