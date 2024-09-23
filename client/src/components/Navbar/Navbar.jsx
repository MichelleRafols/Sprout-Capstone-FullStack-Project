import './Navbar.scss';
import logo from '../../assets/logo/logo.png';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
    return (
        <section className="navbar">
            <ul className="navbar__list">
                <li className="navbar__item">
                    <Link to='/' className="navbar__logo-link">
                        <img className="navbar__logo" src={logo} alt="Sprout logo" />
                    </Link>
                </li>
                <ul className="navbar__sublist">
                    <li className="navbar__item">
                        <NavLink to='/' className="navbar__link" activeClassName="navbar__link--active">
                            Home
                        </NavLink>
                    </li>
                    <li className="navbar__item">
                        <NavLink to='/reflections/list' className="navbar__link" activeClassName="navbar__link--active">
                            Reflections
                        </NavLink>
                    </li>
                </ul>
            </ul>
        </section>
    )
}
