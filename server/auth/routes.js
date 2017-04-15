// @flow
/* eslint camelcase: 0 */
import { Map } from 'immutable';
import { accessToken as twitterAccessToken, requestToken as twitterRequestToken } from './twitterAuth';
import express from 'express';
import Twit from 'twit';

const auth = express.Router();

let authPending: Map<string, string> = Map();

// twitter auth
auth.route('/twitter').get(async (req, res) => {
    const consumerKey = process.env.TWITTER_CONSUMER_KEY;
    const consumerSecret = process.env.TWITTER_CONSUMER_SECRET;
    if (!consumerKey || !consumerSecret) {
        res.redirect(302, 'http://localhost:3000/start');
        return;
    }

    const { oauth_token, oauth_verifier } = req.query;
    if (req.query && oauth_token && oauth_verifier && authPending.has(oauth_token)) {
        const reqSecret = authPending.get(oauth_token);
        const twitAuth = await twitterAccessToken(
            consumerKey,
            consumerSecret,
            oauth_token,
            reqSecret,
            oauth_verifier
        );
        console.log(twitAuth);
        const T = new Twit(twitAuth);
        res.redirect(302, 'http://localhost:3000/start');
        //TODO do stuff
    } else {
        const { token, secret, url } = await twitterRequestToken(
            consumerKey,
            consumerSecret,
            'http://localhost:3000/auth/twitter'
        );
        authPending = authPending.set(token, secret);
        res.redirect(302, url);
    }
});

// mastodon auth
auth.route('/mastodon').get((req, res) => {
    res.send('About Mastodons');
});

export default auth;
