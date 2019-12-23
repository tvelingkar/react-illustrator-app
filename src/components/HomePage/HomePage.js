import React from "react";
import { Redirect } from "react-router-dom";

import { AuthConsumer } from "../../libraries/authContext";
import Login from "../Login";

const HomePage = () => (
  <AuthConsumer>
    {({ authenticated }) =>
      authenticated ? (
        <Redirect to="/dashboard" />
      ) : (
        <div>
          <Login />
        </div>
      )
    }
  </AuthConsumer>
);

export default HomePage;