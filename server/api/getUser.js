// @flow

export default (async function getUser(id?: string): Promise<ClientUser> {
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
    const user = await db.findOne({ _id: id });
    console.log(user);
    if (!user) {
        return defaultUser;
    }

    return {
        loggedIn: true,
        mastodon: user.mastodon.map(a => a.userData),
        twitter: user.twitter.map(a => a.userData),
        config: user.config,
    };
});
