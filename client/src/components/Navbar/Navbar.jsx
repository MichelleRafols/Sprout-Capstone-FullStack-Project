import './Navbar.scss';
import logo from '../../assets/logo/logo.png';
import { Link } from 'react-router-dom';


export default function Navbar() {
    return (
        <section className="navbar">
            <ul className="navbar__list">
                <li className="navbar__item">
                    <Link to='/'>
                        <img className="navbar__logo" src={logo} alt="Sprout logo" />
                    </Link>
                </li>
                <ul className="navbar__sublist">
                    <li className="navbar__item">Home</li>
                    <li className="navbar__item">About</li>
                </ul>
            </ul>
        </section>
    )
}
