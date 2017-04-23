// @flow
import { toClientUser } from '../converter/user';

export async function getUser(id?: string): Promise<ClientUser> {
    const defaultUser = {
        loggedIn: false,
        mastodon: [],
        twitter: [],
        config: {
            defaultMastodonInstance: 'mastodon.social',
        },
        connections: [],
    };
    console.log(id);
    if (!id) {
        return defaultUser;
    }
    const user: ?User = await db.findOne({ _id: id });
    if (!user) {
        return defaultUser;
    }

    return toClientUser(user);
}
