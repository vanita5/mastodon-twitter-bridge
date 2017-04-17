// @flow
import { Nav, Navbar, NavItem, NavLink } from 'reactstrap';

type Props = {
    loggedIn: boolean,
};
const Menu = ({ loggedIn }: Props) => (
    <Navbar inverse full>
        <Nav navbar className="ml-auto">
            {loggedIn &&
                <NavItem>
                    <NavLink href="/logout">Logout</NavLink>
                </NavItem>}
        </Nav>
    </Navbar>
);

export default Menu;
