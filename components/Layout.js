import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'

import NProgress from 'nprogress'

Router.onRouteChangeStart = url => {
    console.log(`Loading ${url}`)
    NProgress.start()
}
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

export default ({ children }) => (
    <div>
        <Head>
            <title>Twitter - Mastodon Bridge</title>
            <meta charSet="utf-8"/>
            <meta name='viewport' content='initial-scale=1.0, width=device-width' />

            <link rel="stylesheet" type="text/css" href="/static/nprogress.css"/>
            <link rel="stylesheet" type="text/css" href="/static/bootstrap.min.css"/>
        </Head>

        <h1>Twitter - Mastodon</h1>
        { children }
    </div>
)
