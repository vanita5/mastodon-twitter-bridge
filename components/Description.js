// @flow
import { Col, Row } from 'reactstrap';
import AccountCard from './AccountCard';
import AuthorizeCard from './AuthorizeCard';
import Menu from './Menu';
import React from 'react';
import SubHeader from './SubHeader';

type Props = {
    loggedIn: boolean,
    twitterAccounts: TwitterAccountData[],
    mastodonAccounts: MastodonAccountData[],
    defaultMastodonInstance: string,
};

export default class Description extends React.PureComponent {
    props: Props;
    //db: DatabaseWrapper = new DatabaseWrapper();

    render() {
        const { twitterAccounts, mastodonAccounts, defaultMastodonInstance, loggedIn } = this.props;
        return (
            <div id="description">
                <Menu loggedIn={loggedIn} />
                <SubHeader />
                <Row style={{ marginTop: 50 }}>
                    <Col lg="6" xs="12">
                        <AuthorizeCard
                            hasAccount={twitterAccounts.length > 0}
                            serviceName="Twitter"
                            authLink="/auth/twitter"
                            backColor="#1da1f2"
                            img="twitter_card_logo.svg"/>
                        {twitterAccounts.map(acc => (
                            <AccountCard key={acc.id} type="twitter" account={acc} />
                        ))}
                    </Col>
                    <Col lg="6" xs="12">
                        <AuthorizeCard
                            hasAccount={mastodonAccounts.length > 0}
                            serviceName="Mastodon"
                            authLink="/auth/mastodon"
                            backColor="#292326"
                            img="mastodon_card_logo.png"
                            allowCustomInstance
                            defaultInstance={defaultMastodonInstance}/>
                        {mastodonAccounts.map(acc => (
                            <AccountCard key={acc.id} type="mastodon" account={acc} />
                        ))}
                    </Col>
                </Row>
            </div>
        );
    }
}
