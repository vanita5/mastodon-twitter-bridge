// @flow
import { Col, Row } from 'reactstrap';
import { Map } from 'immutable';
import AuthorizeCard from './AuthorizeCard';
import React from 'react';
import SubHeader from './SubHeader';

type Props = {
    twitterAccounts?: Map<string, Object>,
    mastodonAccounts?: Map<string, Object>,
};

export default class Description extends React.PureComponent {
    props: Props;
    //db: DatabaseWrapper = new DatabaseWrapper();

    // getInitialProps() {
    // TODO, load account database from server
    // }

    render() {
        return (
            <div id="description">
                <SubHeader />
                <Row style={{ marginTop: 75 }}>
                    <Col lg="6" xs="12">
                        <AuthorizeCard
                            serviceName="Twitter"
                            authLink="/auth/twitter"
                            backColor="#1da1f2"
                            img="twitter_card_logo.svg"/>
                    </Col>
                    <Col lg="6" xs="12">
                        <AuthorizeCard
                            serviceName="Mastodon"
                            authLink="/auth/mastodon"
                            backColor="#292326"
                            img="mastodon_card_logo.png"
                            allowCustomInstance/>
                    </Col>
                </Row>
            </div>
        );
    }
}
