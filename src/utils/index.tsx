import * as React from "react";
import { Redirect, Route } from 'react-router-dom';

type TypeProps = {
  component: any;
  redirectTo: string;
  path: string;
};

/**
 * HOC Auth Router
 * @param {func} component
 * @param {bool} authenticated
 * @param {strig} redirectTo
 */

const AuthRoute = (props: TypeProps) => {
  const { component, redirectTo, path } = props;
  const Component = component;
  return (
    <Route
      path={path}
      render={props =>
        <Component {...props} />
        // localStorage.getItem("auth") ? (
        // ) : (
        //   <Redirect to={redirectTo} />
        // )
      }
    />
  );
};

AuthRoute.displayName = "HOC Auth Router";

export default AuthRoute;
