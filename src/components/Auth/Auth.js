import React, { useState } from 'react';

import { AuthProvider } from '../../libraries/authContext';

const Auth = props => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({
    role: 'visitor',
  });
  const [accessToken, setAccessToken] = useState('');

  const initiateLogin = username => {
    setAuthenticated(true);
    if (username === 'admin') {
      setUser({
        role: 'admin',
      });
    } else if (username === 'visitor') {
      setUser({
        role: 'visitor',
      });
    }
  };

  const logout = () => {};

  const handleAuthentication = () => {
    setSession();
  };

  const setSession = authResult => {};

  const authProviderValue = {
    authenticated,
    user,
    accessToken,
    initiateLogin: initiateLogin,
    handleAuthentication: handleAuthentication,
    logout: logout,
  };

  return (
    <AuthProvider value={authProviderValue}>{props.children}</AuthProvider>
  );
};

export default Auth;
