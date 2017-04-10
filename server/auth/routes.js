// @flow
import { getLink as getTwitterLink } from './twitterAuth';
import express from 'express';
const auth = express.Router();

// twitter auth
auth.route('/twitter').get(async (req, res) => {
    const authLink = await getTwitterLink();
    res.redirect(302, authLink);
});

// mastodon auth
auth.route('/mastodon').get((req, res) => {
    res.send('About Mastodons');
});

export default auth;
