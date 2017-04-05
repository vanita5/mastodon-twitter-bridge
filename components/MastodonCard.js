import {
    Card,
    CardImg,
    CardText,
    CardBlock,
    CardTitle,
    CardSubtitle,
    Button
} from 'reactstrap'

const cardStyle = {
    width: 400,
    margin: '0 auto'
}

export default () => (
    <Card style={cardStyle}>
        <CardImg
            top
            width="100%"
            src="/static/img/mastodon_card.png"
            alt="Mastodon" />
        <CardBlock>
            <CardTitle>Mastodon</CardTitle>
            <CardSubtitle>Not yet connected.</CardSubtitle>
            <CardText>Please authorize with Mastodon.</CardText>
            <Button>Authorize</Button>
        </CardBlock>
    </Card>
)