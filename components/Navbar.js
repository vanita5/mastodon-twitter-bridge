import Link from 'next/link'

import Icon from 'react-icon'

export default () => (
    <div className="navbar-wrapper">
        <nav>
            <div className="logo">
                <Link href="/"><Icon glyph="plug"/></Link>
            </div>
            <div className="menu">
                <ul>
                    <li className="root">Menu</li>
                    <li className="sub">
                        <Link href="/">Home</Link>
                    </li>
                    <li className="sub">
                        <Link href="/about">About</Link>
                    </li>
                </ul>
                <hr/>
            </div>
        </nav>
    </div>
)