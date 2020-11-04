import React from "react";

import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ children, ...rest }) {
  // const storage = JSON.parse(localStorage.getItem("persist:root")).auth;
  // const authJSON = JSON.parse(storage);
  // console.log(authJSON);
  const rehydrated = useSelector((state) => state._persist.rehydrated);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return rehydrated === true ? (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/sign-in",
              state: { from: location },
            }}
          />
        )
      }
    />
  ) : (
    ""
  );
}

export default PrivateRoute;
