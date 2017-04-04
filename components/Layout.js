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

const bodyStyle = {
    background: '#282c37',
    minWidth: '100%',
    paddingTop: 50,
    paddingBottom: 50,
    fontSize: '1rem',
    lineHeight: 1.5,
    color: '#cfd2da'
}

export default ({ children }) => (
    <div style={bodyStyle}>
        <Head>
            <title>Twitter - Mastodon Bridge</title>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>

            <link rel="stylesheet" type="text/css" href="/static/nprogress.css"/>
            <link rel="stylesheet" type="text/css" href="/static/bootstrap.min.css"/>
        </Head>

        <h1>Twitter - Mastodon</h1>
        { children }
    </div>
)
