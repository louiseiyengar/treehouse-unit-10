import React, {useState, useContext} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Context } from '../../Context';

import ErrorsDisplay from '../ErrorsDisplay';

function UserSignUp () {
  const context = useContext(Context);
  let history = useHistory();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmail] = useState('');
  const [password, setPass] = useState('');
  const [errors, setErrors] = useState([]);

  const handleChange = (event) => {
    const value = event.target.value;
    switch (event.target.name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "emailAddress":
        setEmail(value);
        break;
      case "password":
        setPass(value);
        break;
      default:
        return;
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // Create user
    const user = {
      firstName,
      lastName,
      emailAddress,
      password,
    };

    context.data.createUser(user)
    .then( response => {
      if (response.status === 400) {
        setErrors(response.message);
      } else if (response.status === 201) {
        context.actions.signIn(emailAddress, password)
          .then(() => {
            history.push('/');
          })
      } else {
        history.push('/error');
      }
    })
    .catch((err) => {
      console.log(err);
      history.push('/error');
    });
  }
    
  const handleCancel = () => {
    history.push('/');
  }
  
  return (
    <main>
      <div className="form--centered">
        <h2>Sign Up</h2>
        <ErrorsDisplay errors={errors} />
        <form onSubmit={handleSubmit}>
            <label htmlFor="firstName">First Name</label>
            <input id="firstName" name="firstName" type="text" onChange={handleChange} value={firstName} autoComplete="first-name" />
            <label htmlFor="lastName">Last Name</label>
            <input id="lastName" name="lastName" type="text" onChange={handleChange} value={lastName} autoComplete="name" />
            <label htmlFor="emailAddress">Email Address</label>
            <input id="emailAddress" name="emailAddress" type="emailAddress" onChange={handleChange} value={emailAddress} autoComplete="email" />
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" onChange={handleChange} value={password} autoComplete="current-password" />
            <button className="button" type="submit">Sign Up</button>
            <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
        </form>
        <p>Already have a user account? onClick here to <Link to="/signin">sign in</Link>!</p>
      </div>
    </main>
  )
}

export default UserSignUp
