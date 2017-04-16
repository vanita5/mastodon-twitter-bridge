// @flow
import UUID from 'uuid-js';

export async function newAuth(session: any, type: 'twitter' | 'mastodon', auth: AuthData) {
    let existingUser;
    if (session.user) {
        existingUser = await db.findOne({
            _id: session.user,
        });
    } else {
        existingUser = await db.findOne({
            [type]: {
                $elemMatch: auth,
            },
        });
    }

    let userId;

    if (existingUser) {
        userId = existingUser._id;
        await db.update(
            { _id: userId },
            {
                $addToSet: {
                    [type]: auth,
                },
            },
            {}
        );
    } else {
        const newId = UUID.create().toString();
        await db.insert({
            _id: UUID.create().toString(),
            twitter: type === 'twitter' ? [auth] : [],
            mastodon: type === 'mastodon' ? [auth] : [],
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
