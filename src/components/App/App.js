import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.scss';
import Auth from '../Auth';
import Footer from '../Footer';
import Navbar from '../Navbar';
import Routes from '../Routes';
import HomePage from '../HomePage/HomePage';

const App = () => {
  return (
    <Auth>
      <HomePage />
    </Auth>
  );
};
App.whyDidYouRender = true;
export default App;
