// @flow
import { Col, Row } from 'reactstrap';
import { PureComponent } from 'react';
import AccountPicker from './AccountPicker';

type NewConnectionProps = {
    twitterAccounts: ClientTwitterAccount[],
    mastodonAccounts: ClientMastodonAccount[],
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
                    <div style={style.settings} />
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

const style = {
    connectionRow: {
        maxWidth: 600,
        margin: 'auto',
    },
    picker: {
        zIndex: 1,
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
    settings: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
};
