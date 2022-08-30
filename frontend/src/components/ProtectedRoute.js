import React from 'react';
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ path, loggedIn, isChecking, children }) => {
  return (
    <Route path={path} exact>
      { isChecking ? (
        <main className={"content page__content"}></main>
      ) : (
        loggedIn ? children : <Navigate to="./sign-in" />
      )}
    </Route>
  )
}

export default ProtectedRoute;