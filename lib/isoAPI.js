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
        saveConnection: (
            data: $Shape<ClientConnection>
        ): Promise<{ connection?: ClientConnection, status: number }> =>
            fetch('api/connection', {
                credentials: 'include',
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }).then(async res => ({
                connection: (await res.json()) || undefined,
                status: res.status,
            })),
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
