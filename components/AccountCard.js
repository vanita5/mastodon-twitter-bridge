// @flow
import { Card, CardBlock, CardSubtitle, CardTitle } from 'reactstrap';

type Props = {
    account: AccountData,
};

const AccountCard = ({ account }: Props) => (
    <Card className="text-center" style={style.card}>
        <div style={style.image(account.backgroundImage)} className="card-img-top">
            <div style={style.avatar(account.profileImage)} />
        </div>
        <CardBlock>
            <CardTitle>{account.name}</CardTitle>
            <CardSubtitle>
                {`@${account.screenName}`}
                {account.protected && <span className="fa fa-lock" style={style.lock} />}
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
    lock: {
        marginLeft: 5,
    },
};
