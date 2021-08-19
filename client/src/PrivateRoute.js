import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Context } from './Context';

/**
 * This higher order component will take a component as a prop and render that component
 * only if a user has successfully signed in.
 * 
 * If there is no authenticated user, the component will redirect to the sign in screen.  It
 * will put the component's location (URI) in state, so the sign in sceen can redirect back to 
 * this props Component after the user has signed in.
 */
function PrivateRoute ({ component: Component, ...rest }) {
  const context = useContext(Context);
  return (
    <Route
      {...rest}
      render={props => context.authenticatedUser ? (
            <Component { ...props } />
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
