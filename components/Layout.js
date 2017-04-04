import Header from './Header'

const layoutStyle = {}

const Layout = props => (
    <div style={layoutStyle}>
        <Header/>
        {props.children}
    </div>
)

export default Layout
