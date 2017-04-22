/* eslint-disable */
declare module CSSModule {
    declare var exports: { [key: string]: string };
}

declare type ReactChild = React$Element<any>;
declare type ReactChildren = ?(ReactChild | ReactChild[]);

declare type Style = {
    [key: string]: InlineStyle,
};

declare type StyleFX = {
    [key: string]: (...any) => InlineStyle,
};

declare type NextPageContext = {
    pathname: string,
    query: {
        [key: string]: string,
    },
    req?: any,
    res?: any,
    jsonPageRes?: any,
    err?: any,
};

declare type Accounts =
    | {
          loggedIn: false,
      }
    | {
          loggedIn: true,
          mastodon: MastodonAccountData[],
          twitter: TwitterAccountData[],
      };
