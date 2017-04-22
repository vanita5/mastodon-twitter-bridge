// @flow
import { Container } from 'reactstrap';
import Head from 'next/head';
import Menu from './Menu';
import NProgress from 'nprogress';
import Router from 'next/router';
import stylesheet from 'styles/styles.scss';

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

type Props = {
    children?: ReactChildren,
    loggedIn?: boolean,
};

const Layout = ({ children, loggedIn }: Props) => (
    <div id="layout">
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        <Head>
            <title>Twitter - Mastodon Bridge</title>
            <meta charSet="utf-8" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"/>

            <link
                rel="stylesheet"
                type="text/css"
                href="/static/css/nprogress.css"/>
            <link
                rel="stylesheet"
                type="text/css"
                href="/static/css/bootstrap.min.css"/>
            <link
                rel="stylesheet"
                type="text/css"
                href="/static/css/font-awesome.min.css"/>
        </Head>
        <Container id="wrapper">
            {loggedIn && <Menu loggedIn={loggedIn} />}
            {children}
        </Container>
    </div>
);

export default Layout;
