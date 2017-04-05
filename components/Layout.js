import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'

import { Container } from 'reactstrap'

import NProgress from 'nprogress'

import stylesheet from 'styles/styles.scss'

Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

export default ({ children }) => (
    <div id="layout">
        <style dangerouslySetInnerHTML={{ __html: stylesheet }}/>
        <Head>
            <title>Twitter - Mastodon Bridge</title>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>

            <link rel="stylesheet" type="text/css" href="/static/css/nprogress.css"/>
            <link rel="stylesheet" type="text/css" href="/static/css/bootstrap.min.css"/>
            <link rel="stylesheet" type="text/css" href="/static/css/font-awesome.min.css"/>
        </Head>
        <Container id="wrapper">
            { children }
        </Container>
    </div>
)
