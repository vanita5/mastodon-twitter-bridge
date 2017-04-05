import Link from 'next/link'

import Title from './Title'

import { Row, Col, Button } from 'reactstrap'

const buttonStyle = {
    cursor: 'pointer'
}

export default () => (
    <div id="header">
        <Row>
            <Col lg="12">
                <img className="img-responsive" style={{ margin: '0 auto' }} src="/static/img/mastodon.png"/>
            </Col>
        </Row>
        <Row style={{ marginTop: 25 }}>
            <Col lg="12">
                <Title/>
            </Col>
        </Row>
        <Row style={{ marginTop: 100 }}>
            <Col lg="12">
                <Button outline color="success" size="lg" style={buttonStyle}>
                    <Link href="/start"><p>BUILD A BRIDGE</p></Link>
                </Button>
            </Col>
        </Row>
    </div>
)