// @flow
import { Card, CardBlock, CardSubtitle, CardTitle } from 'reactstrap';

type Props =
    | {
          type: 'twitter',
          account: TwitterAccountData,
      }
    | {
          type: 'mastodon',
          account: MastodonAccountData,
      };

const AccountCard = (p: Props) => (
    <Card className="text-center" style={style.card}>
        <div style={style.image(p.account.backgroundImage)} className="card-img-top">
            <div style={style.avatar(p.account.profileImage)} />
            <div style={style.delete}>
                <a href="/remove">
                    <i style={style.delete.i} className="fa fa-trash-o" />
                </a>
            </div>
        </div>
        <CardBlock>
            <CardTitle>{p.account.name}</CardTitle>
            <CardSubtitle>
                {`@${p.account.screenName}`}
                {p.type === 'mastodon' && <span style={style.instance}>{`@${p.account.instanceUrl}`}</span>}
                {p.account.protected && <span className="fa fa-lock" style={style.lock} />}
            </CardSubtitle>
        </CardBlock>
    </Card>
);

export default AccountCard;

const style = {
    card: {
        width: 400,
        margin: '15px auto',
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
    delete: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        width: 25,
        height: 25,
        position: 'absolute',
        top: 0,
        right: 0,
        margin: 15,
        borderRadius: '50%',
        cursor: 'pointer',
        i: {
            color: 'black',
        },
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
