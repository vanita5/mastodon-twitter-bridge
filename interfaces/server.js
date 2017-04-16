/* eslint-disable */
import type DataStore from 'nedb';
import type NextApp from 'next';

declare type AuthData =
    | {
          consumer_key: string,
          consumer_secret: string,
          access_token: string,
          access_token_secret: string,
      }
    | {
          access_token: string,
      };

declare var db: DataStore;
declare var app: NextApp;
