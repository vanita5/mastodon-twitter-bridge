// @flow
/* eslint-disable quote-props */

export type NotificationCode = $Keys<typeof successCodes> | $Keys<typeof errorCodes>;

const successCodes = {
    '000': 'Success',
    '010': 'Successfully authorized Twitter Account',
    '011': 'Successfully authorized Mastodon Account',
    '020': 'Successfully removed Twitter Account',
    '021': 'Successfully removed Mastodon Account',
};

const errorCodes = {
    '100': 'Error',
    '110': 'Error during Twitter authorization',
    '111': 'Error during Mastodon authorization',
    '112': 'Error during account verification',
    '113': 'Session expired',
    '120': 'Server is not set up correctly',
    '130': 'Not implemented',
    '140': 'Please specify a valid instance URL!',
};

const NotificationCodes = {
    error: errorCodes,
    success: successCodes,
    all: { ...errorCodes, ...successCodes },
};

export default NotificationCodes;
