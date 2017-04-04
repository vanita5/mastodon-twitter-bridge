import Link from 'next/link'

import Icon from 'react-icon'

export default props => (
    <div className="navbar-wrapper">
        <nav>
            <div className="logo">
                <Link href="/"><Icon glyph="plug"/></Link>
            </div>
            <div className="menu">
                <ul>
                    <li className="root">Menu</li>
                    <li className={`sub ${props.url === '/' ? 'active' : ''}`}>
                        <Link href="/">Home</Link>
                    </li>
                    <li className={`sub ${props.url === '/about' ? 'active' : ''}`}>
                        <Link href="/about">About</Link>
                    </li>
                </ul>
                <hr/>
            </div>
        </nav>
    </div>
)