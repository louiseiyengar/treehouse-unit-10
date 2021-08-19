import React, {useState, useContext} from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Context } from '../../Context';

import ErrorsDisplay from '../ErrorsDisplay';

/*
  This component renders a form that allows a user to sign in, if that user
  has already signed up. If the user successfully signs in, that user will be
  redirected to the home screen, or the last screen that user was on, if the
  page required the user to be authenticated to view it. 

  The component also renders an error component with validation errors if the 
  user didn't successfully sign in.
*/
function UserSignIn () {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPass] = useState('');
  const [errors, setErrors] = useState([]);

  const context = useContext(Context);
  const location = useLocation();
  const history = useHistory();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    (name === "emailAddress") ? setEmailAddress(value) : setPass(value);
  }

  const cancel = (event) => {
    event.preventDefault();
    history.push('/')
  }

  const submit = (event) => {
    event.preventDefault();
    
    //once user is signed in, the user should redirect to the last page the user was on
    //or go the the home page.
    const { from } = location.state || { from: { pathname: '/' } };

    if (emailAddress && password) {
      context.actions.signIn(emailAddress, password)
      .then(response => {
        //sign in successful
        if (response.status === 200) {
          history.push(from);
        //there are validation errors
        } else if (response.status === 401) {
          setErrors(response.errors)
        } else {
          history.push('/error')
        }
      })
      .catch((error) => {
        console.error(error);
        history.push('/error');
      });
    } else {
      setErrors([ 'Please enter your Email Address and Password']);
    }
  }

  return (
    <main>
      <div className="form--centered">
          <h2>Sign In</h2>
          <ErrorsDisplay errors={errors} />
          <form>
              <label htmlFor="emailAddress">Email Address</label>
              <input id="emailAddress" name="emailAddress" type="email" value={emailAddress} onChange={handleChange} />
              <label htmlFor="password">Password</label>
              <input id="password" name="password" type="password" value={password} onChange={handleChange} autoComplete="current-password" />
              <button className="button" type="submit" onClick={submit}>Sign In</button>
              <button className="button button-secondary" onClick={cancel}>Cancel</button>
          </form>
          <p>Don't have a user account? Click here to <Link className="signup" to="/signup">sign up</Link>!</p>
      </div>
    </main>
  )
}

export default UserSignIn;
