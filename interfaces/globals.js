/* eslint-disable */
declare module CSSModule {
    declare var exports: { [key: string]: string };
}

declare type ReactChild = React$Element<any>;
declare type ReactChildren = ?(ReactChild | ReactChild[]);

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
