import React, { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";

const Auth = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      {loggedIn ? (
        <Register setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
      ) : (
        <Login setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
      )}
    </div>
  );
};

export default Auth;
