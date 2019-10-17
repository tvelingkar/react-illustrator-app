import React from 'react';
import {Link} from 'react-router-dom';

import './Navbar.css';

const Navbar = () => {
    return (
        <nav
            className="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top"
            id="mainNav">
            <div className="container">
                <Link className="navbar-brand" to="/">Todo App</Link>
                <button
                    className="navbar-toggler navbar-toggler-right text-uppercase font-weight-bold bg-primary text-white rounded"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarResponsive"
                    aria-controls="navbarResponsive"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    Menu
                    <i className="fas fa-bars"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item mx-0 mx-lg-1">
                            <button type="button" className="btn btn-outline-info">
                            <Link className="nav-link py-3 px-0 px-lg-3 rounded" to="/add-todo">
                                <svg className="icon" viewBox="0 0 8 8">
                                    <use xlinkHref='/assets/fonts/open-iconic.min.svg#plus' className="icon-plus"></use>
                                </svg>
                            </Link>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;