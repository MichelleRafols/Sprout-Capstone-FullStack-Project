import './Navbar.scss';
import logo from '../../assets/logo/logo.png';


export default function Navbar() {
    return (
        <section className="navbar">
            <ul className="navbar__list">
                <li className="navbar__item">
                    <img className="navbar__logo" src={logo} alt="Sprout logo" />
                </li>
                <ul className="navbar__sublist">
                    <li className="navbar__item">Home</li>
                    <li className="navbar__item">About</li>
                </ul>
            </ul>
        </section>
    )
}
