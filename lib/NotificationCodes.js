// @flow
/* eslint-disable quote-props */

export type NotificationCode = $Keys<typeof successCodes> | $Keys<typeof errorCodes>;

const successCodes = {
    '000': 'Success',
    '010': 'Successfully authorized Twitter Account',
    '011': 'Successfully authorized Mastodon Account',
};

const errorCodes = {
    '100': 'Error',
    '110': 'Error during Twitter Authorization',
    '111': 'Error during Mastodon Authorization',
    '120': 'Server is not set up correctly',
    '130': 'Not implemented',
};

const NotificationCodes = {
    error: errorCodes,
    success: successCodes,
    all: { ...errorCodes, ...successCodes },
};

export default NotificationCodes;