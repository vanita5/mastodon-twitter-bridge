// @flow
/* eslint camelcase: 0 */
import { newAuth } from './success';
import { accessToken as twitterAccessToken, requestToken as twitterRequestToken } from './twitterAuth';
import express from 'express';
import getUser from '../api/getUser';
import Mastodon from 'mastodon-api';
import notify from '../notify';

const auth = express.Router();

type PendingAuth = {
    id: string,
    secret: string,
    permission: Permission,
};

auth.route('/accounts').get(async (req, res) => {
    const id = req.session.user;
    const accounts = await getUser(id);
    res.json(accounts);
});

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
    req.session.auth = {
        secret,
        id: token,
        permission: ro ? 0 : 1,
    };
    await new Promise(resolve => req.session.save(() => resolve()));
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
    if (!req.session.auth) {
        res.redirect(302, notify('113'));
        return;
    }
    const pending: PendingAuth = req.session.auth;
    if (pending.id !== oauth_token) {
        res.redirect(302, notify('110'));
        return;
    }
    const twitAuth = await twitterAccessToken(
        consumerKey,
        consumerSecret,
        oauth_token,
        pending.secret,
        oauth_verifier
    );
    await newAuth(req, res, { type: 'twitter', auth: twitAuth, permission: pending.permission });
});

// mastodon auth
auth.route('/mastodon').get(async (req, res) => {
    const baseURL = process.env.BASE_URL;
    if (!baseURL) {
        res.redirect(302, notify('120'));
        return;
    }

    const { ro } = req.query;

    if (!req.query.instanceUrl || typeof req.query.instanceUrl !== 'string') {
        res.redirect(302, notify('140'));
        return;
    }

    const instanceUrl = req.query.instanceUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');

    const { client_id, client_secret } = await Mastodon.createOAuthApp(
        `https://${instanceUrl}/api/v1/apps`,
        'mastodon-twitter-bridge',
        `read${ro ? '' : ' write'}`,
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
    req.session.auth = {
        id: client_id,
        secret: client_secret,
        permission: ro ? 0 : 1,
    };
    await new Promise(resolve => req.session.save(() => resolve()));
    res.redirect(302, url);
});

auth.route('/mastodon/redirect').get(async (req, res) => {
    const baseURL = process.env.BASE_URL;
    if (!baseURL) {
        res.redirect(302, notify('120'));
        return;
    }
    if (!req.session.auth) {
        res.redirect(302, notify('113'));
        return;
    }

    const { mclient_id, instance_url, code } = req.query;
    const pending: PendingAuth = req.session.auth;
    if (pending.id !== mclient_id) {
        res.redirect(302, notify('111'));
        return;
    }
    if (!mclient_id || !code) {
        res.redirect(302, notify('111'));
        return;
    }

    const accessToken = await Mastodon.getAccessToken(
        mclient_id,
        pending.secret,
        code,
        `https://${instance_url}`,
        `${baseURL}/auth/mastodon/redirect?mclient_id=${mclient_id}&instance_url=${instance_url}`
    );
    const mastAuth = {
        access_token: accessToken,
        api_url: `https://${instance_url}/api/v1/`,
    };
    await newAuth(req, res, {
        type: 'mastodon',
        auth: mastAuth,
        instance_url,
        permission: pending.permission,
    });
});

auth.route('/remove').get(async (req, res) => {
    const { id, type } = req.query;

    if (!req.session.user) {
        res.redirect(113, notify('113'));
        return;
    }

    await db.update(
        { _id: req.session.user },
        {
            $unset: {
                [`${type}.${id}`]: true,
            },
        },
        {}
    );
    res.redirect(302, notify(type === 'twitter' ? '020' : '021'));
});

export default auth;
