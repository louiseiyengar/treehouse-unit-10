import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Context } from './Context';

function PrivateRoute ({ component: Component, ...rest }) {
  const context = useContext(Context);
  console.log(rest);
  return (
    <Route
      {...rest}
      render={props => context.authenticatedUser ? (
            <Component {...props} />
          ) : (
            <Redirect to={{
              pathname: '/signin',
              state: { from: props.location }
            }} />
          )
      }
    />
  )
};

export default PrivateRoute;
