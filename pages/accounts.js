// @flow
import api from '../lib/isoAPI';
import Description from '../components/Description';
import Layout from '../components/Layout';
import Notification from '../components/Notification';
import NotificationCodes from '../lib/NotificationCodes';
import type { NotificationCode } from '../lib/NotificationCodes';

type Props = { code?: NotificationCode } & ClientUser;

const Accounts = ({ code, loggedIn, mastodon, twitter, config, connections }: Props) => (
    <Layout loggedIn={loggedIn}>
        {code && <Notification code={code} />}
        <Description
            connections={connections}
            mastodonAccounts={mastodon}
            twitterAccounts={twitter}
            defaultMastodonInstance={config.defaultMastodonInstance}/>
    </Layout>
);

Accounts.getInitialProps = async ({ query, req }: NextPageContext) => {
    const user = await api.getUser(req && req.session.user);

    return {
        ...user,
        code: query.notify !== undefined && NotificationCodes.all.hasOwnProperty(query.notify)
            ? query.notify
            : undefined,
    };
};

export default Accounts;
