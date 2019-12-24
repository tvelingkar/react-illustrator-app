import React, { useState } from "react";
import { Button, Form } from 'carbon-components-react';

import { AuthConsumer } from "../../libraries/authContext";
import './Login.scss';

const Login = () => {
    const [username,
        setUsername] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const onLoginClick = (initiateLogin) => {
        initiateLogin(username);
    }

    return (
        <AuthConsumer>
            {({ initiateLogin }) => (
                <div class="ria-login-page">
                    <div class="main-container">
                        <p>ToDo App</p>
                        <Form>
                            <p class="login-form-title">Sign In to Page</p>
                            <section>
                                <div class="bx--form-item">
                                    <label for="text1" class="bx--label">Enter UserID or Email</label>
                                    <input
                                        type="text"
                                        class="bx--text__input"
                                        value={username}
                                        onChange={handleUsernameChange}
                                    />
                                </div>
                            </section>
                            <section>
                                <Button type="button" onClick={() => onLoginClick(initiateLogin)}>
                                    Login
                            </Button>
                            </section>
                        </Form>
                    </div>
                </div>
            )}
        </AuthConsumer>
    )
};

export default Login;