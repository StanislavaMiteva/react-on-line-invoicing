import { Link } from 'react-router-dom';

import './Header.css';

const Header = () => {
    return (
        <header className="site-header">
            <nav className="header-navbar">
                <section className="navbar-user page-wrapper">
                    <article className="first-bar">
                        <Link to="/">On-line Invoicing</Link>
                        <Link className="button" to="/invoice/add">New Invoice</Link>
                        <Link className="button" to="/invoice/all">All Invoices</Link>
                        <Link className="button" to="/Counterparties">Counterparties</Link>
                    </article>
                    <article className="second-bar">
                        <ul>
                            <li>Welcome, some name!</li>
                            <li>
                                <Link to="/logout">
                                    <i className="fas fa-sign-out-alt"></i>
                                     Logout
                                </Link>
                            </li>
                        </ul>
                    </article>
                </section>
                <section className="navbar-anonymous">
                    <ul>
                        <li>
                            <Link to="/register"><i className="fas fa-user-plus"></i> Register</Link>
                        </li>
                        <li>
                            <Link to="/login"><i className="fas fa-sign-in-alt"></i> Login</Link>
                        </li>
                    </ul>
                </section>
            </nav>
        </header>
    );
}

export default Header;
