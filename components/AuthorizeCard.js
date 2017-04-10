// @flow

import { Card, CardBlock, CardSubtitle, CardText, CardTitle } from 'reactstrap';

type Props = {
    serviceName: string,
    authorized: boolean,
    authLink: string,
    backColor: string,
    img: string,
};

const AuthorizeCard = (
    { serviceName, authorized, authLink, backColor, img }: Props,
) => (
    <Card style={style.card}>
        <div style={style.image(img, backColor)} className="card-img-top" />
        <CardBlock>
            <CardTitle>{serviceName}</CardTitle>
            <CardSubtitle>
                {authorized ? 'Authorized!' : 'Not yet connected.'}
            </CardSubtitle>
            <CardText>{`Please authorize with ${serviceName}.`}</CardText>
            <a className="btn btn-secondary" href={authLink}>Authorize</a>
        </CardBlock>
    </Card>
);
export default AuthorizeCard;

const style = {
    card: {
        width: 400,
        margin: '15px auto',
    },
    image: (src, backgroundColor) => ({
        display: 'inline-block',
        width: '100%',
        height: 266,
        backgroundImage: `url(/static/img/${src})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundColor,
    }),
};
