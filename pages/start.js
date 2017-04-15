// @flow
import Description from '../components/Description';
import Layout from '../components/Layout';
import Notification from '../components/Notification';
import NotificationCodes from '../lib/NotificationCodes';
import type { NotificationCode } from '../lib/NotificationCodes';

type Props = {
    code?: NotificationCode,
};

const Start = ({ code }: Props) => (
    <Layout>
        {code && <Notification code={code} />}
        <Description />
    </Layout>
);

Start.getInitialProps = ({ query }: NextPageContext) => ({
    code: query.notify !== undefined && NotificationCodes.all.hasOwnProperty(query.notify)
        ? query.notify
        : undefined,
});

export default Start;
