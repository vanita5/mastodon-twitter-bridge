import Head from 'next/head'

const Layout = ({ children }) => (
    <div>
        <Head>
            <title>Twitter - Mastodon Bridge</title>
            <meta charSet="utf-8"/>
            <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        </Head>
        
        { children }
    </div>
)

export default Layout
