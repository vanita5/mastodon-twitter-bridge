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
        saveConnection: (data: ClientConnection): Promise<Response> =>
            fetch('api/connection', {
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify(data),
            }),
        deleteConnection: (id: string): Promise<Response> =>
            fetch(`api/connection?id=${id}`, {
                credentioals: 'include',
                method: 'DELETE',
            }),
        deleteAccount: (id: string, type: 'mastodon' | 'twitter'): Promise<Response> =>
            fetch(`api/account?id=${id}&type=${type}`, {
                credentials: 'include',
                method: 'DELETE',
            }),
    };
}

export default isomorphicAPI;
