import React, {useContext} from 'react';
import { Redirect } from 'react-router-dom';
import { Context } from '../../Context';

function UserSignOut () {
  const context = useContext(Context);
  context.actions.signOut();

  return (
    <Redirect to="/" />
  );
}

export default UserSignOut