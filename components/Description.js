// @flow
import { Col, Row } from 'reactstrap';
import AccountCard from './AccountCard';
import AuthorizeCard from './AuthorizeCard';
import React from 'react';
import SubHeader from './SubHeader';

type Props = {
    loggedIn: boolean,
    twitterAccounts?: UserData[],
    mastodonAccounts?: UserData[],
};

export default class Description extends React.PureComponent {
    props: Props;
    //db: DatabaseWrapper = new DatabaseWrapper();

    render() {
        const { twitterAccounts, mastodonAccounts } = this.props;
        console.log(twitterAccounts, mastodonAccounts);
        return (
            <div id="description">
                <SubHeader />
                <Row style={{ marginTop: 50 }}>
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
                <Row style={{ marginTop: 25 }}>
                    <Col lg="6" xs="12">
                        {twitterAccounts &&
                            twitterAccounts.map((user, id) => <AccountCard key={id} user={user} />)}
                    </Col>
                    <Col lg="6" xs="12">
                        {mastodonAccounts &&
                            mastodonAccounts.map((user, id) => <AccountCard key={id} user={user} />)}
                    </Col>
                </Row>
            </div>
        );
    }
}
