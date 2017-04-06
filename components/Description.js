import React from 'react'

import SubHeader from './SubHeader'
import TwitterCard from './TwitterCard'
import MastodonCard from './MastodonCard'

import DatabaseWrapper from '../lib/DatabaseWrapper'

import { Row, Col } from 'reactstrap'

export default class Description extends React.Component {
    constructor(props) {
        super(props)
        this.db = new DatabaseWrapper()
        this.state = {
            twitterAuthorized: false,
            mastodonAuthorized: false
        }
    }

    componentDidMount() {
        this.getAuthorization()
    }

    getAuthorization() {
        const self = this
        this.db.getAuthorization()
            .catch(err => console.log(err))
            .then(docs => {
                console.log(docs)
                docs.forEach(doc => {
                    if (!doc.service) return
                    if (doc.service === 'twitter') self.setState({
                        twitterAuthorized: doc.access_token && doc.access_token.length > 0
                    })
                    else if (doc.service === 'mastodon') self.setState({
                        mastodonAuthorized: doc.access_token && doc.access_token.length > 0
                    })
                })
            })
    }

    render() {
        return (
            <div id="description">
                <SubHeader/>
                <Row style={{ marginTop: 75 }}>
                    <Col lg="6" xs="12">
                        <TwitterCard authorized={this.state.twitterAuthorized}/>
                    </Col>
                    <Col lg="6" xs="12">
                        <MastodonCard authorized={this.state.mastodonAuthorized}/>
                    </Col>
                </Row>
            </div>
        )
    }
}