// @flow
/* eslint camelcase: 0 */
import { Map } from 'immutable';
import { accessToken as twitterAccessToken, requestToken as twitterRequestToken } from './twitterAuth';
import express from 'express';
import notify from '../notify';
import Twit from 'twit';

const auth = express.Router();

let authPending: Map<string, string> = Map();

// twitter auth
auth.route('/twitter').get(async (req, res) => {
    const consumerKey = process.env.TWITTER_CONSUMER_KEY;
    const consumerSecret = process.env.TWITTER_CONSUMER_SECRET;
    const baseURL = process.env.BASE_URL;
    if (!consumerKey || !consumerSecret || !baseURL) {
        res.redirect(302, notify('120'));
        return;
    }
    const { token, secret, url } = await twitterRequestToken(
        consumerKey,
        consumerSecret,
        `${baseURL}/auth/twitter/redirect`
    );
    authPending = authPending.set(token, secret);
    res.redirect(302, url);
});
auth.route('/twitter/redirect').get(async (req, res) => {
    const consumerKey = process.env.TWITTER_CONSUMER_KEY;
    const consumerSecret = process.env.TWITTER_CONSUMER_SECRET;
    const { oauth_token, oauth_verifier } = req.query;
    if (!consumerKey || !consumerSecret) {
        res.redirect(302, notify('110'));
        return;
    }
    if (!oauth_token || !oauth_verifier) {
        res.redirect(302, notify('120'));
        return;
    }
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
    res.redirect(302, notify('010'));
    //TODO do stuff
});

// mastodon auth
auth.route('/mastodon').get((req, res) => {
    res.redirect(302, notify('130'));
});

auth.route('/mastodon/redirect').get((req, res) => {
    res.redirect(302, notify('130'));
});

export default auth;
