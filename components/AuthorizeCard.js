// @flow

import {
  Button,
  Card,
  CardBlock,
  CardSubtitle,
  CardText,
  CardTitle,
} from 'reactstrap';

type Props = {
  serviceName: string,
  authorized: boolean,
  authorize: Function,
  backColor: string,
  img: string,
};

const AuthorizeCard = (
  { serviceName, authorized, authorize, backColor, img }: Props,
) => (
    <Card style={style.card}>
        <div style={style.image(img, backColor)} className="card-img-top" />
        <CardBlock>
            <CardTitle>{serviceName}</CardTitle>
            <CardSubtitle>
                {authorized ? 'Authorized!' : 'Not yet connected.'}
            </CardSubtitle>
            <CardText>{`Please authorize with ${serviceName}.`}</CardText>
            <Button onClick={authorize}>Authorize</Button>
        </CardBlock>
    </Card>
);
export default AuthorizeCard;

const style = {
  card: {
    width: 400,
    margin: '0 auto',
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
