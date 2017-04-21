// @flow

export async function getUser(id?: string): Promise<ClientUser> {
    const defaultUser = {
        loggedIn: false,
        mastodon: [],
        twitter: [],
        config: {
            defaultMastodonInstance: 'mastodon.social',
        },
    };
    console.log(id);
    if (!id) {
        return defaultUser;
    }
    const user: ?User = await db.findOne({ _id: id });
    if (!user) {
        return defaultUser;
    }

    return {
        loggedIn: true,
        mastodon: Object.keys(user.mastodon).map(id => user.mastodon[id].accountData),
        twitter: Object.keys(user.twitter).map(id => user.twitter[id].accountData),
        config: {
            defaultMastodonInstance: user.config.defaultMastodonInstance || 'mastodon.social',
        },
    };
}
