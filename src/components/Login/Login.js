import React from "react";
import { Button, Form } from 'carbon-components-react';

import { AuthConsumer } from "../../libraries/authContext";

const Login = () => (
    <AuthConsumer>
        {({ initiateLogin }) => (
            <Form>
                <Button type="button" onClick={initiateLogin}>
                    Login
                </Button>
            </Form>
        )}
    </AuthConsumer>
);

export default Login;