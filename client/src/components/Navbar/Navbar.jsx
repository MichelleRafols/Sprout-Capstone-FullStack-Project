import './Navbar.scss';
import logo from '../../assets/logo/logo.png';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
    return (
        <section className="navbar">
            <ul className="navbar__list">
                <li className="navbar__item">
                    <Link to='/' className="navbar__link-logo">
                        <img className="navbar__logo" src={logo} alt="Sprout logo" />
                    </Link>
                </li>
                <ul className="navbar__sublist">
                    <li className="navbar__item">
                        <NavLink 
                            to='/' 
                            className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'}
                        >
                            Home
                        </NavLink>
                    </li>
                    <li className="navbar__item">
                        <NavLink 
                            to='/reflections/list' 
                            className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'}
                        >
                            Reflections
                        </NavLink>
                    </li>
                </ul>
            </ul>
        </section>
    )
}
