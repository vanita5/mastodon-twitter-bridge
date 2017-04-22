// @flow

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

    return {
        loggedIn: true,
        mastodon: Object.keys(user.mastodon).map(id => ({
            ...user.mastodon[id].accountData,
            type: 'mastodon',
        })),
        twitter: Object.keys(user.twitter).map(id => ({
            ...user.twitter[id].accountData,
            type: 'twitter',
        })),
        config: {
            defaultMastodonInstance: user.config.defaultMastodonInstance ||
                'mastodon.social',
        },
        connections: user.connections,
    };
}
