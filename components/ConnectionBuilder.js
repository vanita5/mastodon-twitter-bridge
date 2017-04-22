// @flow
import { NewConnection } from './Connection';
import SubHeader from './SubHeader';

type Props = {
    twitterAccounts: ClientTwitterAccount[],
    mastodonAccounts: ClientMastodonAccount[],
    connections: Object[],
};
const ConnectionBuilder = ({
    twitterAccounts,
    mastodonAccounts,
    connections,
}: Props) => (
    <div>
        <SubHeader />
        <div style={style.newCon}>
            <NewConnection
                twitterAccounts={twitterAccounts}
                mastodonAccounts={mastodonAccounts}/>
        </div>
        {connections.map(() => null)}
    </div>
);

export default ConnectionBuilder;

const style = {
    newCon: {
        marginTop: 50,
    },
};
