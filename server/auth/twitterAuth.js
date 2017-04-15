// @flow
/* eslint camelcase: 0 */
import { OAuth } from 'oauth';

type RequestTokenResult = {
    url: string,
    token: string,
    secret: string,
};
export const requestToken = async (
    consumerKey: string,
    consumerSecret: string,
    readOnly: ?boolean,
    callbackUrl: string
): Promise<RequestTokenResult> => {
    const oauth = new OAuth(
        'https://twitter.com/oauth/request_token',
        'https://twitter.com/oauth/access_token',
        consumerKey,
        consumerSecret,
        '1.0A',
        callbackUrl,
        'HMAC-SHA1'
    );

    const {
        token,
        secret,
    } = await new Promise((resolve, reject) => {
        oauth.getOAuthRequestToken(
            {
                x_auth_access_type: readOnly ? 'read' : 'write',
            },
            (error, token, secret, results) => {
                if (error || !results.oauth_callback_confirmed === 'true') {
                    reject();
                }
                resolve({ token, secret });
            }
        );
    });
    return {
        url: `https://twitter.com/oauth/authorize?oauth_token=${token}`,
        token,
        secret,
    };
};

type AccessTokenResult = {
    consumer_key: string,
    consumer_secret: string,
    access_token: string,
    access_token_secret: string,
};
export const accessToken = async (
    consumerKey: string,
    consumerSecret: string,
    reqToken: string,
    reqSecret: string,
    verifier: string
): Promise<AccessTokenResult> => {
    const oauth = new OAuth(
        'https://twitter.com/oauth/request_token',
        'https://twitter.com/oauth/access_token',
        consumerKey,
        consumerSecret,
        '1.0A',
        null,
        'HMAC-SHA1'
    );
    const {
        token,
        secret,
    } = await new Promise((resolve, reject) => {
        oauth.getOAuthAccessToken(reqToken, reqSecret, verifier, (error, token, secret) => {
            if (error) {
                reject();
            }
            resolve({ token, secret });
        });
    });
    return {
        consumer_key: consumerKey,
        consumer_secret: consumerSecret,
        access_token: token,
        access_token_secret: secret,
    };
};
