// @flow
import { Button, Card, CardBlock, CardSubtitle, CardTitle } from 'reactstrap';
import { PureComponent } from 'react';
import api from '../lib/isoAPI';

type CardAccount =
    | {
          type: 'twitter',
          account: TwitterAccountData,
      }
    | {
          type: 'mastodon',
          account: MastodonAccountData,
      };

type Props = {
    accountData: CardAccount,
};

type State = {
    isDeleted?: boolean,
    deletionOngoing?: { resolve: Function, reject: Function },
};

export default class AccountCard extends PureComponent {
    props: Props;
    state: State = {};

    deletionPromise = (): { resolve: Function, reject: Function } => {
        const { account, type } = this.props.accountData;
        let resolve = () => {};
        let reject = () => {};
        new Promise((res, rej) => {
            resolve = res;
            reject = rej;
        }).then(
            async () => {
                await api.deleteAccount(account.id, type);
                this.setState({
                    isDeleted: true,
                });
            },
            () => {
                this.setState({
                    deletionOngoing: undefined,
                });
            }
        );
        return { resolve, reject };
    };

    handleDeleteIconClick = () => {
        this.setState((state: State) => ({
            deletionOngoing: state.deletionOngoing
                ? undefined
                : this.deletionPromise(),
        }));
    };

    render() {
        const a = this.props.accountData;
        const { isDeleted, deletionOngoing } = this.state;
        if (isDeleted) {
            return null;
        }
        return (
            <Card className="text-center" style={style.card}>
                <div
                    style={style.image(a.account.backgroundImage)}
                    className="card-img-top">
                    <div style={style.avatar(a.account.profileImage)} />
                    <div style={style.delete(Boolean(deletionOngoing))}>
                        <span
                            style={style.deleteIcon}
                            className="fa fa-trash-o"
                            onClick={this.handleDeleteIconClick}/>
                    </div>
                </div>
                <div style={style.showContainer(Boolean(deletionOngoing))}>
                    {deletionOngoing &&
                        <div style={style.askDeletionBody}>
                            <span>{'Sure \'bout that?'}</span>
                            <span>
                                {'This will also delete NaN Connections'}
                            </span>
                            <div style={style.deletionButtons}>
                                <Button
                                    style={style.askDelButton}
                                    color="danger"
                                    onClick={
                                        deletionOngoing
                                            ? deletionOngoing.resolve
                                            : undefined
                                    }>
                                    {'Yep'}
                                </Button>
                                <Button
                                    style={style.askDelButton}
                                    onClick={
                                        deletionOngoing
                                            ? deletionOngoing.reject
                                            : undefined
                                    }>
                                    {'Nope'}
                                </Button>
                            </div>
                        </div>}
                </div>
                <CardBlock>
                    <CardTitle>{a.account.name}</CardTitle>
                    <CardSubtitle>
                        {`@${a.account.screenName}`}
                        {a.type === 'mastodon' &&
                            <span
                                style={style.instance}>{`@${a.account.instanceUrl}`}</span>}
                        {a.account.protected &&
                            <span className="fa fa-lock" style={style.lock} />}
                    </CardSubtitle>
                </CardBlock>
            </Card>
        );
    }
}

const style = {
    card: {
        width: 400,
        margin: '15px auto',
        overflow: 'hidden',
        position: 'relative',
    },
    image: src => ({
        width: '100%',
        height: 200,
        backgroundImage: `url(${src})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        display: 'inline-flex',
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    }),
    avatar: src => ({
        backgroundImage: `url(${src})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        height: 100,
        width: 100,
        border: '2px solid white',
        borderRadius: 4,
        boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.75)',
    }),
    delete: big => ({
        backgroundColor: `rgba(255, 255, 255, ${big ? 0.8 : 0.5})`,
        width: big ? 895 : 25,
        height: big ? 895 : 25,
        position: 'absolute',
        top: big ? -435 : 0,
        right: big ? -435 : 0,
        borderRadius: '50%',
        transition: 'all 0.3s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 15,
    }),
    showContainer: shown => ({
        opacity: shown ? 1 : 0,
        transition: 'opacity 0.3s',
    }),
    askDeletionBody: {
        position: 'absolute',
        top: 0,
        right: 0,
        height: '100%',
        width: '100%',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    deletionButtons: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    askDelButton: {
        margin: 5,
        cursor: 'pointer',
    },
    deleteIcon: {
        cursor: 'pointer',
        color: '#be0000',
        zIndex: 3,
    },
    lock: {
        marginLeft: 5,
    },
    instance: {
        //fontStyle: 'italic',
        fontWeight: 'lighter',
        color: '#aaa',
    },
};
