// @flow

import {
    Card,
    CardBlock,
    CardSubtitle,
    CardText,
    CardTitle,
    Input,
    InputGroup,
    InputGroupAddon,
} from 'reactstrap';

type Props = {
    serviceName: string,
    authLink: string,
    backColor: string,
    img: string,
    allowCustomInstance?: boolean,
};

const AuthorizeCard = ({ serviceName, authLink, backColor, img, allowCustomInstance }: Props) => (
    <Card style={style.card}>
        <div style={style.image(img, backColor)} className="card-img-top" />
        <CardBlock>
            <CardTitle>{serviceName}</CardTitle>
            <CardSubtitle>
                {'Not yet connected.'}
            </CardSubtitle>
            <CardText>{`Please authorize with ${serviceName}.`}</CardText>
            <form action={authLink} method="get">
                {allowCustomInstance &&
                    <div>
                        <InputGroup size="sm">
                            <InputGroupAddon>Mastodon instance</InputGroupAddon>
                            <Input name="instanceUrl" defaultValue="mastodon.social" />
                        </InputGroup>
                        <br />
                    </div>}
                <div>
                    <input type="checkbox" name="ro" id={`ro-${serviceName}`} />
                    <label htmlFor={`ro-${serviceName}`}>Read-Only</label>
                </div>
                <button style={style.firstButton} className="btn btn-primary" type="submit">Authorize</button>
            </form>
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
    firstButton: {
        marginRight: 15,
    },
};
