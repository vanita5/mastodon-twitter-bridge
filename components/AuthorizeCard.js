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
    hasAccount?: boolean,
    serviceName: string,
    authLink: string,
    backColor: string,
    img: string,
    allowCustomInstance?: boolean,
    defaultInstance?: string,
};

const AuthorizeCard = (
    { serviceName, hasAccount, authLink, backColor, img, allowCustomInstance, defaultInstance }: Props
) => (
    <Card style={style.card}>
        <div style={style.image(img, backColor)} className="card-img-top" />
        <CardBlock>
            <CardTitle>{serviceName}</CardTitle>
            <CardSubtitle>
                {hasAccount ? `Add another ${serviceName} account` : `Connect a ${serviceName} account`}
            </CardSubtitle>
            <CardText>{`Please authorize with ${serviceName}.`}</CardText>
            <form action={authLink} method="get">
                <div style={style.customInstance}>
                    {allowCustomInstance &&
                        <InputGroup size="sm">
                            <InputGroupAddon>Mastodon instance</InputGroupAddon>
                            <Input name="instanceUrl" defaultValue={defaultInstance || 'mastodon.social'} />
                        </InputGroup>}
                </div>
                <div style={style.authRow}>
                    <button style={style.firstButton} className="btn btn-primary" type="submit">
                        Authorize
                    </button>
                    <input type="checkbox" name="ro" id={`ro-${serviceName}`} />
                    <label style={style.roLabel} htmlFor={`ro-${serviceName}`}>Read-Only</label>
                </div>
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
    customInstance: {
        height: 40,
    },
    authRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    firstButton: {
        marginRight: 15,
    },
    roLabel: {
        marginLeft: 5,
        marginBottom: 0,
    },
};
