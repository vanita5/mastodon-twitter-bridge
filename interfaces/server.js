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

declare type AuthData = TwitterAuthData | MastodonAuthData;

declare type UserData = {
    id: string,
    name: string,
    screenName: string,
    protected: boolean,
    profileImage: string,
    backgroundImage: string,
};

declare type User = { auth: AuthData, userData: UserData };

declare var db: DataStore;
declare var app: NextApp;
declare var api: {
    [key: string]: Function,
};
