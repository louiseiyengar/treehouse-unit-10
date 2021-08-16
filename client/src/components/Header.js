import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../Context';

function Header () {
  const context = useContext(Context);
  const authUser = context.authenticatedUser;

  return (
    <header>
      <div className="wrap header--flex">
          <h1 className="header--logo"><Link className="signup" to="/">Courses</Link></h1>
          <nav>
            {authUser ? (
              <ul className="header--signedin">
                <li>Welcome, {`${authUser.firstName} ${authUser.lastName}`}!</li>
                <li><Link to="/signout">Sign Out</Link></li>
              </ul>
            ) : (
                <ul className="header--signedout">
                  <li><Link className="signup" to="/signup">Sign Up</Link></li>
                  <li><Link className="signin" to="/signin">Sign In</Link></li>
                </ul>
            )}
          </nav>
      </div>
    </header>
  )
}

export default Header;

