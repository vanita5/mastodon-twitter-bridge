import  { PureComponent } from 'react';

import SubHeader from './SubHeader';
import AuthorizeCard from './AuthorizeCard';

import DatabaseWrapper from '../lib/DatabaseWrapper';

import { Row, Col } from 'reactstrap';

export default class Description extends PureComponent {
    db = new DatabaseWrapper();
    state = {
        twitterAuthorized: false,
        mastodonAuthorized: false,
    };

    componentWillMount() {
        this.getAuthorization();
    }

    getAuthorization() {
        this.db.getAuthorization()
            .catch(err => console.log(err))
            .then(docs => {
                console.log(docs)
                docs.forEach(doc => {
                    if (!doc.service) return
                    if (doc.service === 'twitter') this.setState({
                        twitterAuthorized: doc.access_token && doc.access_token.length > 0
                    });
                    else if (doc.service === 'mastodon') this.setState({
                        mastodonAuthorized: doc.access_token && doc.access_token.length > 0
                    });
                });
            });
    }

    render() {
        return (
            <div id="description">
                <SubHeader/>
                <Row style={{ marginTop: 75 }}>
                    <Col lg="6" xs="12">
                        <AuthorizeCard
                            serviceName="Twitter"
                            authorize={() => {}} // TODO
                            backColor="#1da1f2"
                            img="twitter_card_logo.svg"
                            authorized={this.state.twitterAuthorized}/>
                    </Col>
                    <Col lg="6" xs="12">
                        <AuthorizeCard
                            serviceName="Mastodon"
                            authorize={() => {}} // TODO
                            backColor="#282c37"
                            img="mastodon_card_logo.png"
                            authorized={this.state.mastodonAuthorized}/>
                    </Col>
                </Row>
            </div>
        )
    }
}
