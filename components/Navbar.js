import Link from 'next/link'

import Icon from 'react-icon'

export default () => (
    <div className="navbar-wrapper">
        <nav>
            <div className="logo">
                <Link href="/"><Icon glyph="plug"/></Link>
            </div>
        </nav>
    </div>
)