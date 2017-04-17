/* eslint-disable */
import type DataStore from 'nedb';
import type NextApp from 'next';

declare type TwitterAuthData = {
    consumer_key: string,
    consumer_secret: string,
    access_token: string,
    access_token_secret: string,
};
declare type MastodonAuthData = {
    access_token: string,
    api_url: string,
    instance_url: string,
};

declare type AccountData = {
    id: string,
    name: string,
    screenName: string,
    protected: boolean,
    profileImage: string,
    backgroundImage: string,
};

declare type MastodonAccount = { auth: MastodonAuthData, accountData: AccountData };
declare type TwitterAccount = { auth: TwitterAuthData, accountData: AccountData };

declare type UserConfig = {
    defaultMastodonInstance?: string,
};

declare type User = {
    _id: string,
    mastodon: {| [id: string]: MastodonAccount |},
    twitter: {| [id: string]: TwitterAccount |},
    config: UserConfig,
    connections: any[], //TODO
};

declare type ClientUserConfig = {
    defaultMastodonInstance: string,
};

declare type ClientUser = {
    loggedIn: boolean,
    mastodon: AccountData[],
    twitter: AccountData[],
    config: ClientUserConfig,
};

declare var db: DataStore;
declare var app: NextApp;
declare var serversideAPI: {
    [key: string]: Function,
};
