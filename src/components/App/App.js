import React from 'react';

import './App.scss';
import Auth from '../Auth';
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
