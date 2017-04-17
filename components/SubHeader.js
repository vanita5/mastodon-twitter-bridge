// @flow
import { Col, Row } from 'reactstrap';
import Title from './Title';

const SubHeader = () => (
    <Row>
        <Col lg="2">
            <img className="img-responsive" style={{ width: 120 }} src="/static/img/mastodon.png" />
        </Col>
        <Col lg="10" style={{ padding: 8 }}>
            <Title />
        </Col>
    </Row>
);

export default SubHeader;
