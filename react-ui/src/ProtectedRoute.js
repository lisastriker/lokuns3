import React from "react";
import { Redirect, Route } from "react-router-dom";
//Create component protected route
function ProtectedRoute({ component: Component, redirectPath, ...restOfProps }) {
  const isAuthenticated = localStorage.getItem('useruid');
  console.log("this", isAuthenticated);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to={redirectPath} />
      }
    />
  );
}

export default ProtectedRoute;