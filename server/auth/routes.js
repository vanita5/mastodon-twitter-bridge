// @flow
/* eslint camelcase: 0 */
import { Map } from 'immutable';
import { accessToken as twitterAccessToken, requestToken as twitterRequestToken } from './twitterAuth';
import express from 'express';
import notify from '../notify';
import Twit from 'twit';
import Mastodon from 'mastodon-api';

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
    const { ro } = req.query;
    const { token, secret, url } = await twitterRequestToken(
        consumerKey,
        consumerSecret,
        Boolean(ro),
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
        res.redirect(302, notify('120'));
        return;
    }
    if (!oauth_token || !oauth_verifier) {
        res.redirect(302, notify('110'));
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
auth.route('/mastodon').get(async (req, res) => {
    const clientId = process.env.MASTODON_CLIENT_ID;
    const clientSecret = process.env.MASTODON_CLIENT_SECRET;
    const baseURL = process.env.BASE_URL;
    if (!clientId || !clientSecret || !baseURL) {
        res.redirect(302, notify('120'));
        return;
    }
    const { ro, instanceUrl } = req.query;
    //FIXME looks like Mastodon doesn't allow localhost as the redirect uri
    const url = await Mastodon.getAuthorizationUrl(
        clientId,
        clientSecret,
        `https://${instanceUrl}`,
        `read${ro ? '' : ' write follow'}`,
        `${baseURL}/auth/mastodon/redirect`
    );
    res.redirect(302, url);
});

auth.route('/mastodon/redirect').get((req, res) => {
    const clientId = process.env.MASTODON_CLIENT_ID;
    const clientSecret = process.env.MASTODON_CLIENT_SECRET;
    console.log(req.query);
});

export default auth;
