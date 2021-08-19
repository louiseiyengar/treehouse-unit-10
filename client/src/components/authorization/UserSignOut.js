import React, {useContext, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import { Context } from '../../Context';

/*
  This component calls a method in Context which signs out a user who has signed in. 
  The authenticatedUse property in Context will be set to null, and the authenticatedUser Cookie will be cleared.
*/
function UserSignOut () {
  const context = useContext(Context);
  
  useEffect(() => {
    context.actions.signOut();
  }, [context.actions])

  return (
    <Redirect to="/" />
  );
}

export default UserSignOut
