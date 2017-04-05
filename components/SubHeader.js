import Title from "./Title";

import { Row, Col } from "reactstrap";

export default () => (
    <Row>
        <Col lg="2">
            <img className="img-responsive" style={{ width: 120 }} src="/static/img/mastodon.png" />
        </Col>
        <Col lg="10" style={{ padding: 10 }}>
            <Title/>
        </Col>
    </Row>
)