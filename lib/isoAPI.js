// @flow

let isomorphicAPI;
if (typeof window === 'undefined') {
    isomorphicAPI = serversideAPI;
} else {
    isomorphicAPI = {
        getUser: (): Promise<ClientUser> =>
            fetch('/auth/accounts', {
                credentials: 'include',
            }).then(data => data.json()),
    };
}

export default isomorphicAPI;
