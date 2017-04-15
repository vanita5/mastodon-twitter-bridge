// @flow
/* eslint camelcase: 0 */
import { Map } from 'immutable';
import { accessToken as twitterAccessToken, requestToken as twitterRequestToken } from './twitterAuth';
import express from 'express';
import Mastodon from 'mastodon-api';
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
    const baseURL = process.env.BASE_URL;
    if (!baseURL) {
        res.redirect(302, notify('120'));
        return;
    }

    const { ro, instanceUrl } = req.query;
    const { client_id, client_secret } = await Mastodon.createOAuthApp(
        `https://${instanceUrl}/api/v1/apps`,
        'mastodon-twitter-bridge',
        `read${ro ? '' : ' write follow'}`,
        `${baseURL}/auth/mastodon/redirect`
    );
    if (!client_id || !client_secret) {
        res.redirect(302, notify('111'));
        return;
    }

    const url = await Mastodon.getAuthorizationUrl(
        client_id,
        client_secret,
        `https://${instanceUrl}`,
        `read${ro ? '' : ' write'}`,
        `${baseURL}/auth/mastodon/redirect?mclient_id=${client_id}&instance_url=${instanceUrl}`
    );
    authPending = authPending.set(client_id, client_secret);
    console.log(url);
    res.redirect(302, url);
});

auth.route('/mastodon/redirect').get(async (req, res) => {
    const baseURL = process.env.BASE_URL;
    if (!baseURL) {
        res.redirect(302, notify('120'));
        return;
    }

    const { mclient_id, instance_url, code } = req.query;
    const client_secret = authPending.get(mclient_id);
    if (!mclient_id || !client_secret || !code) {
        res.redirect(302, notify('111'));
        return;
    }

    const access_token = await Mastodon.getAccessToken(
        mclient_id,
        client_secret,
        code,
        `https://${instance_url}`,
        `${baseURL}/auth/mastodon/redirect?mclient_id=${mclient_id}&instance_url=${instance_url}`
    );
    console.log(access_token);
    const M = new Mastodon({ access_token });
    res.redirect(302, notify('011'));
    // TODO
});

export default auth;
