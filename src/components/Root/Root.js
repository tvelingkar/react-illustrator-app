import React from 'react';
import { Provider } from 'react-redux';

import configureStore from '../../store/configureStore';
import App from '../../components/App';

import './Root.scss';

const Root = () => {
  const store = configureStore();
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default Root;
