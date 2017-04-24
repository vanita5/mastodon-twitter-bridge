// @flow
import { Col, Row } from 'reactstrap';
import AccountCard from './AccountCard';
import AuthorizeCard from './AuthorizeCard';
import React from 'react';
import SubHeader from './SubHeader';

type Props = {
    twitterAccounts: ClientTwitterAccount[],
    mastodonAccounts: ClientMastodonAccount[],
    defaultMastodonInstance: string,
    connections: ClientConnection[],
};

const Description = ({ twitterAccounts, mastodonAccounts, defaultMastodonInstance, connections }: Props) => (
    <div id="description">
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
                    <AccountCard
                        key={acc.id}
                        affectedConnections={helpers.affectedConnections(acc, connections)}
                        accountData={{
                            type: 'twitter',
                            account: acc,
                        }}/>
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
                    <AccountCard
                        key={acc.id}
                        affectedConnections={helpers.affectedConnections(acc, connections)}
                        accountData={{
                            type: 'mastodon',
                            account: acc,
                        }}/>
                ))}
            </Col>
        </Row>
    </div>
);

const helpers = {
    affectedConnections: (account: ClientAccount, connections) =>
        connections.filter(c => c.target.id === account.id || c.source.id === account.id).length,
};

export default Description;
