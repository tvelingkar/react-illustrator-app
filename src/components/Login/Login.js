import React, { useState } from 'react';
import { Button, Form } from 'carbon-components-react';

import { AuthConsumer } from '../../libraries/authContext';
import './Login.scss';

const Login = () => {
  const [username, setUsername] = useState('');

  const handleUsernameChange = event => {
    setUsername(event.target.value);
  };

  const onLoginClick = initiateLogin => {
    initiateLogin(username);
  };

  return (
    <AuthConsumer>
      {({ initiateLogin }) => (
        <div className='ria-login-page'>
          <div className='main-container'>
            <p>ToDo App</p>
            <Form>
              <p className='login-form-title'>Sign In to Page</p>
              <section>
                <div className='bx--form-item'>
                  <label htmlFor='text1' className='bx--label'>
                    Enter UserID or Email
                  </label>
                  <input
                    type='text'
                    className='bx--text__input'
                    value={username}
                    onChange={handleUsernameChange}
                  />
                </div>
              </section>
              <section>
                <Button
                  type='button'
                  onClick={() => onLoginClick(initiateLogin)}>
                  Login
                </Button>
              </section>
            </Form>
          </div>
        </div>
      )}
    </AuthConsumer>
  );
};

export default Login;
