import Layout from '../components/Layout'
import Navbar from '../components/Navbar'

export default props => (
    <Layout>
        <Navbar url={props.url.pathname}/>
    </Layout>
)
