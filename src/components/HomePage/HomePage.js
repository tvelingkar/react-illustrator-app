import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { AuthConsumer } from '../../libraries/authContext';
import Login from '../Login';
import Footer from '../Footer';
import Navbar from '../Navbar';
import Routes from '../Routes';

const HomePage = () => (
  <AuthConsumer>
    {({ authenticated }) =>
      authenticated ? (
        <Router>
          <Navbar />

          <div className='container' id='main-content'>
            <Routes />
            <Footer />
          </div>
        </Router>
      ) : (
        <Login />
      )
    }
  </AuthConsumer>
);

export default HomePage;
