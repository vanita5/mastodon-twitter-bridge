// @flow
import { PureComponent } from 'react';
import api from '../lib/isoAPI';
import ROConnection, { NewConnection } from './Connection';
import SubHeader from './SubHeader';

type Props = {
    twitterAccounts: ClientTwitterAccount[],
    mastodonAccounts: ClientMastodonAccount[],
    connections: ClientConnection[],
};
type State = {
    createdConnections: ClientConnection[],
};
export default class ConnectionBuilder extends PureComponent {
    props: Props;
    state: State = {
        createdConnections: [],
    };

    createConnection = (con: $Shape<ClientConnection>) => {
        const prom = new Promise(async (resolve, reject) => {
            const { connection, status } = await api.saveConnection(con);
            if (connection && status === 200) {
                resolve(connection);
            } else {
                reject(`Connection saving failed, server response was${status}`);
            }
        }).then((newCon: ClientConnection) => {
            this.setState((state: State) => ({
                createdConnections: [newCon, ...state.createdConnections],
            }));
        });

        return prom;
    };

    render() {
        const { twitterAccounts, mastodonAccounts, connections } = this.props;
        const { createdConnections } = this.state;
        return (
            <div>
                <SubHeader />
                <div style={style.newCon}>
                    <NewConnection
                        twitterAccounts={twitterAccounts}
                        mastodonAccounts={mastodonAccounts}
                        createConnection={this.createConnection}/>
                </div>
                {createdConnections.map(c => <ROConnection key={c.id} source={c.source} target={c.target} />)}
                {connections.map(c => <ROConnection key={c.id} source={c.source} target={c.target} />)}
            </div>
        );
    }
}

const style = {
    newCon: {
        marginTop: 50,
        marginBottom: 150,
    },
};
