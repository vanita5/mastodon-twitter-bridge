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
            src="/static/img/twitter_card.png"
            alt="Twitter" />
        <CardBlock>
            <CardTitle>Twitter</CardTitle>
            <CardSubtitle>Not yet connected.</CardSubtitle>
            <CardText>Please authorize with Twitter.</CardText>
            <Button>Authorize</Button>
        </CardBlock>
    </Card>
)