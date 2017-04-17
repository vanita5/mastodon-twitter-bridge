// @flow
import api from '../lib/isoAPI';
import Description from '../components/Description';
import Layout from '../components/Layout';
import Notification from '../components/Notification';
import NotificationCodes from '../lib/NotificationCodes';
import type { NotificationCode } from '../lib/NotificationCodes';

type Props = { code?: NotificationCode } & ClientUser;

const Start = ({ code, loggedIn, mastodon, twitter, config }: Props) => (
    <Layout>
        {code && <Notification code={code} />}
        <Description
            loggedIn={loggedIn}
            mastodonAccounts={mastodon}
            twitterAccounts={twitter}
            defaultMastodonInstance={config.defaultMastodonInstance}/>
    </Layout>
);

Start.getInitialProps = async ({ query, req }: NextPageContext) => {
    const user = await api.getUser(req && req.session.user);

    return {
        ...user,
        code: query.notify !== undefined && NotificationCodes.all.hasOwnProperty(query.notify)
            ? query.notify
            : undefined,
    };
};

export default Start;
