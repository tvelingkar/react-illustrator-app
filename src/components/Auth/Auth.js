import React, { useState } from "react";

import { AuthProvider } from "../../libraries/authContext";

const Auth = (props) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState({
        role: "visitor"
    });
    const [accessToken, setAccessToken] = useState("");

    const initiateLogin = () => {
console.log('Call Login API')
    };

    const logout = () => {
    };

    const handleAuthentication = () => {
        setSession();
    };

    const setSession = (authResult) => {
    };

    const authProviderValue = {
        authenticated,
        user,
        accessToken,
        initiateLogin: initiateLogin,
        handleAuthentication: handleAuthentication,
        logout: logout
    };

    return (
        <AuthProvider value={authProviderValue}>
            {props.children}
        </AuthProvider>
    );
}

export default Auth;