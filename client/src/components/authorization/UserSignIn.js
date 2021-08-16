import React, {useState, useContext} from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Context } from '../../Context';

import ErrorsDisplay from '../ErrorsDisplay';

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

    const { from } = location.state || { from: { pathname: '/' } };

    if (emailAddress && password) {
      context.actions.signIn(emailAddress, password)
      .then(response => {
        if (!response.errors.length) {
          history.push(from);
        } else {
          setErrors(response.errors)
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
              <input id="password" name="password" type="password" value={password} onChange={handleChange} />
              <button className="button" type="submit" onClick={submit}>Sign In</button>
              <button className="button button-secondary" onClick={cancel}>Cancel</button>
          </form>
          <p>Don't have a user account? Click here to <Link className="signup" to="/signup">sign up</Link>!</p>
      </div>
    </main>
  )
}

export default UserSignIn;
