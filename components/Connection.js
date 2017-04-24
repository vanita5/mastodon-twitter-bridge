// @flow
import { PureComponent } from 'react';
import AccountActions from './AccountActions';
import AccountPicker, { AccountAvatar } from './AccountPicker';
import ConnectionArrow from './ConnectionArrow';

type NewConnectionProps = {
    twitterAccounts: ClientTwitterAccount[],
    mastodonAccounts: ClientMastodonAccount[],
    createConnection: $Shape<ClientConnection> => Promise<void>,
};
type State = {
    source?: ClientAccount,
    target?: ClientAccount,
    settings: {},
    direction: 'source' | 'target' | 'both',
};
export class NewConnection extends PureComponent {
    props: NewConnectionProps;
    state: State = {
        settings: {},
        direction: 'both',
    };
    setTarget = (target?: ClientAccount) => {
        this.setState({ target });
    };
    setSource = (source?: ClientAccount) => {
        this.setState((state: State) => ({
            source,
            target: source && source !== state.target ? state.target : undefined,
        }));
    };
    handleSwitch = () => {
        this.setState((state: State) => ({
            direction: helpers.nextDirection[state.direction],
        }));
    };
    handleCreate = () => {
        const { createConnection } = this.props;
        const { source, target } = this.state;
        const connection = {
            source,
            target,
        };
        createConnection(connection).then(() => {
            this.setState({
                source: undefined,
                target: undefined,
                settings: {},
            });
        });
    };
    render() {
        const { twitterAccounts, mastodonAccounts } = this.props;
        const { source, target, direction } = this.state;
        const sourceAccounts: ClientAccount[] = [...twitterAccounts, ...mastodonAccounts].filter(
            a => a !== source
        );

        const targetAccounts: ClientAccount[] = [
            ...twitterAccounts.filter(() => !source || source.type !== 'twitter'),
            ...mastodonAccounts.filter(() => !source || source.type !== 'mastodon'),
        ].filter(a => a.permission > 0 && a !== target && a !== source);

        return (
            <div style={style.connectionRow}>
                <AccountActions account={source} disabled={direction === 'source'} />
                <div style={style.picker}>
                    <AccountPicker accounts={sourceAccounts} onSelect={this.setSource} selected={source} />
                </div>
                <ConnectionArrow
                    left={source ? source.type : undefined}
                    right={target ? target.type : undefined}
                    arrow={direction}
                    switchable
                    onSwitch={this.handleSwitch}
                    savable={Boolean(source && target)}
                    onSave={this.handleCreate}/>
                <div style={style.picker}>
                    {source &&
                        <AccountPicker
                            accounts={targetAccounts}
                            onSelect={this.setTarget}
                            selected={target}/>}
                </div>
                <AccountActions account={source ? target : undefined} disabled={direction === 'target'} />
            </div>
        );
    }
}

type ConnectionProps = {
    source: ClientAccount,
    target: ClientAccount,
};
export const ROConnection = ({ source, target }: ConnectionProps) => (
    <div style={style.connectionRow}>
        <AccountActions account={source} />
        <div style={style.avatar}>
            <AccountAvatar account={source} />
        </div>
        <ConnectionArrow left={source.type} right={target.type} arrow={'target'} />
        <div style={style.avatar}>
            <AccountAvatar account={target} />
        </div>
        <AccountActions account={target} disabled />
    </div>
);
export default ROConnection;

const helpers = {
    nextDirection: {
        both: 'target',
        target: 'source',
        source: 'both',
    },
};

const style = {
    connectionRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: 50,
        width: '100%',
    },
    picker: {
        zIndex: 2,
        width: 104,
    },
    avatar: {
        zIndex: 1,
    },
};
