/* eslint-disable */
import type DataStore from 'nedb';
import type NextApp from 'next';

type PermissionRead = 0;
type PermissionWrite = 1;

declare type Permission = PermissionRead | PermissionWrite;

declare type TwitterAuthData = {
    consumer_key: string,
    consumer_secret: string,
    access_token: string,
    access_token_secret: string,
};
declare type MastodonAuthData = {
    access_token: string,
    api_url: string,
};

declare type TwitterAccountData = {
    id: string,
    name: string,
    screenName: string,
    protected: boolean,
    profileImage: string,
    backgroundImage: string,
    permission: Permission,
};

declare type MastodonAccountData = {
    id: string,
    name: string,
    screenName: string,
    protected: boolean,
    profileImage: string,
    backgroundImage: string,
    instanceUrl: string,
    permission: Permission,
};

declare type MastodonAccount = { auth: MastodonAuthData, accountData: MastodonAccountData };
declare type TwitterAccount = { auth: TwitterAuthData, accountData: TwitterAccountData };

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
    mastodon: MastodonAccountData[],
    twitter: TwitterAccountData[],
    config: ClientUserConfig,
};

declare var db: DataStore;
declare var app: NextApp;
declare var serversideAPI: {
    [key: string]: Function,
};
