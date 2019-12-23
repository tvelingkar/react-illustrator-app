import React from 'react';

import './Footer.scss';

const Footer = () => {
    return (
        <footer className="copyright text-center fixed-bottom">
            <div className="container">
                <small className='copyright-text'>Copyright &copy; Todo App 2019</small>
            </div>
        </footer>
    );
}

export default Footer;