// @flow
import { Button, Col, Row } from 'reactstrap';
import { PureComponent } from 'react';
import AccountPicker, { AccountAvatar } from './AccountPicker';

type NewConnectionProps = {
    twitterAccounts: ClientTwitterAccount[],
    mastodonAccounts: ClientMastodonAccount[],
    createConnection: $Shape<ClientConnection> => Promise<void>,
};
type State = {
    source?: ClientAccount,
    target?: ClientAccount,
    settings: {},
};
export class NewConnection extends PureComponent {
    props: NewConnectionProps;
    state: State = {
        settings: {},
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
        const { source, target } = this.state;
        const sourceAccounts: ClientAccount[] = [...twitterAccounts, ...mastodonAccounts].filter(
            a => a !== source
        );

        const targetAccounts: ClientAccount[] = [
            ...twitterAccounts.filter(() => !target || target.type !== 'twitter'),
            ...mastodonAccounts.filter(() => !target || target.type !== 'mastodon'),
        ].filter(a => a.permission > 0 && a !== target && a !== source);

        return (
            <Row style={style.connectionRow}>
                <Col lg={5} style={style.picker}>
                    <AccountPicker accounts={sourceAccounts} onSelect={this.setSource} selected={source} />
                </Col>
                <Col lg={2} style={style.settingsCol}>
                    <div style={style.arrowWrap}>
                        <span style={style.arrow} className="fa fa-long-arrow-right" />
                    </div>
                    {source &&
                        target &&
                        <div style={style.center}>
                            <Button color="primary" onClick={this.handleCreate} style={style.saveButton}>
                                {'Save'}
                            </Button>
                        </div>}
                </Col>
                <Col lg={5} style={style.picker}>
                    {source &&
                        <AccountPicker
                            accounts={targetAccounts}
                            onSelect={this.setTarget}
                            selected={target}/>}
                </Col>
            </Row>
        );
    }
}

type ConnectionProps = {
    source: ClientAccount,
    target: ClientAccount,
};
export const ROConnection = ({ source, target }: ConnectionProps) => (
    <Row style={style.connectionRow}>
        <Col lg={5}>
            <AccountAvatar account={source} />
        </Col>
        <Col lg={2} style={style.settingsCol}>
            <div style={style.arrowWrap}>
                <span style={style.arrow} className="fa fa-long-arrow-right" />
            </div>
        </Col>
        <Col lg={5}>
            <AccountAvatar account={target} />
        </Col>
    </Row>
);
export default ROConnection;

const style = {
    connectionRow: {
        maxWidth: 600,
        margin: '80px auto 0 auto',
    },
    picker: {
        zIndex: 2,
    },
    settingsCol: {
        position: 'relative',
    },
    arrowWrap: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    arrow: {
        zIndex: 0,
        fontSize: '20rem',
        position: 'absolute',
        color: 'rgba(255, 255, 255, 0.2)',
    },
    saveButton: {
        zIndex: 1,
        cursor: 'pointer',
    },
    center: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        height: '100%',
    },
};
