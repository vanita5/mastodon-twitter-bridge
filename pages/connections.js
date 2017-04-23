// @flow
import api from '../lib/isoAPI';
import ConnectionBuilder from '../components/ConnectionBuilder';
import Layout from '../components/Layout';
import NotificationCodes from '../lib/NotificationCodes';
import type { NotificationCode } from '../lib/NotificationCodes';

type Props = { code?: NotificationCode } & ClientUser;

const Connections = ({ loggedIn, mastodon, twitter, connections }: Props) => (
    <Layout loggedIn={loggedIn}>
        <ConnectionBuilder mastodonAccounts={mastodon} twitterAccounts={twitter} connections={connections} />
    </Layout>
);

export default Connections;

Connections.getInitialProps = async ({ query, req }: NextPageContext) => {
    const user = await api.getUser(req && req.session.user);

    return {
        ...user,
        code: query.notify !== undefined && NotificationCodes.all.hasOwnProperty(query.notify)
            ? query.notify
            : undefined,
    };
};
