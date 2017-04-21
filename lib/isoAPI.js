// @flow

let isomorphicAPI;
if (typeof window === 'undefined') {
    isomorphicAPI = serversideAPI;
} else {
    isomorphicAPI = {
        getUser: (): Promise<ClientUser> =>
            fetch('/api/user', {
                credentials: 'include',
            }).then(data => data.json()),
        // saveConnections: (data: Connections): Promise<Connections> =>
        //     fetch('api/connections', {
        //         credentials: 'include',
        //         method: 'POST',
        //         body: JSON.stringify(data),
        //     }),
        deleteAccount: (
            id: string,
            type: 'mastodon' | 'twitter'
        ): Promise<Response> =>
            fetch(`api/account?id=${id}&type=${type}`, {
                credentials: 'include',
                method: 'DELETE',
            }),
    };
}

export default isomorphicAPI;
