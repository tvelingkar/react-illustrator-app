import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.scss';
import Auth from '../Auth';
import Footer from '../Footer';
import Navbar from '../Navbar';
import Routes from '../Routes';

const App = () => {
    return (
        <Auth>
            <Router>
                <Navbar />

                <div className="container" id='main-content'>
                    <Routes />
                    <Footer />
                </div>
            </Router>
        </Auth>
    );
}
App.whyDidYouRender = true
export default App;
