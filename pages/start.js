// @flow
import Description from '../components/Description';
import Layout from '../components/Layout';
import Notification from '../components/Notification';
import NotificationCodes from '../lib/NotificationCodes';
import type { NotificationCode } from '../lib/NotificationCodes';

type Props = {
    code?: NotificationCode,
    loggedIn: boolean,
    twitterAccounts?: UserData[],
    mastodonAccounts?: UserData[],
};

const Start = ({ code, loggedIn, mastodonAccounts, twitterAccounts }: Props) => (
    <Layout>
        {code && <Notification code={code} />}
        <Description
            loggedIn={loggedIn}
            mastodonAccounts={mastodonAccounts}
            twitterAccounts={twitterAccounts}/>
    </Layout>
);

Start.getInitialProps = async ({ query, req }: NextPageContext) => {
    let accounts: Accounts;
    if (req) {
        accounts = await api.getAccounts(req.session.user);
    } else {
        const data = await fetch('http://localhost:3000/auth/accounts', {
            credentials: 'include',
        });
        accounts = await data.json();
    }
    return {
        loggedIn: accounts.loggedIn,
        mastodonAccounts: accounts.loggedIn ? accounts.mastodon : undefined,
        twitterAccounts: accounts.loggedIn ? accounts.twitter : undefined,
        code: query.notify !== undefined && NotificationCodes.all.hasOwnProperty(query.notify)
            ? query.notify
            : undefined,
    };
};

export default Start;
