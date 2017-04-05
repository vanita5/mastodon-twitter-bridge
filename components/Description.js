import SubHeader from "./SubHeader";
import TwitterCard from './TwitterCard'
import MastodonCard from "./MastodonCard";

import { Row, Col } from 'reactstrap'

export default () => (
    <div id="description">
        <SubHeader/>
        <Row style={{ marginTop: 75 }}>
            <Col lg="6" xs="12">
                <TwitterCard/>
            </Col>
            <Col lg="6" xs="12">
                <MastodonCard/>
            </Col>
        </Row>
    </div>
)