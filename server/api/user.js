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

    const mastodon = Object.keys(user.mastodon).map(id => ({
        ...user.mastodon[id].accountData,
        type: 'mastodon',
    }));

    const twitter = Object.keys(user.twitter).map(id => ({
        ...user.twitter[id].accountData,
        type: 'twitter',
    }));

    const accounts = [...twitter, ...mastodon];

    const connections = Object.keys(user.connections).map(id => ({
        id,
        settings: user.connections[id].settings,
        //$FlowFixMe
        target: accounts.find(a => a.id === user.connections[id].target),
        //$FlowFixMe
        source: accounts.find(a => a.id === user.connections[id].source),
    }));

    const clientUser = {
        loggedIn: true,
        mastodon,
        twitter,
        connections,
        config: {
            defaultMastodonInstance: user.config.defaultMastodonInstance || 'mastodon.social',
        },
    };

    return clientUser;
}
