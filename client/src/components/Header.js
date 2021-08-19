import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import { Context } from '../Context';

/**
 * This component renders a header used globallly for all pages. Will display Sign In and Sign out
 * links as appropriate.  It will display user's name, if that user has been authenticated.
 */
function Header () {
  const context = useContext(Context);
  const authUser = context.authenticatedUser;

  return (
    <header>
      <div className="wrap header--flex">
          <h1 className="header--logo"><NavLink className="signup" activeStyle={{color: "white"}} to="/">School Courses</NavLink></h1>
          <nav>
            {authUser ? (
              <ul className="header--signedin">
                <li>Welcome, {`${authUser.firstName} ${authUser.lastName}`}!</li>
                <li><NavLink activeStyle={{color: "white"}} to="/signout">Sign Out</NavLink></li>
              </ul>
            ) : (
                <ul className="header--signedout">
                  <li><NavLink className="signup" activeStyle={{color: "white"}} to="/signup">Sign Up</NavLink></li>
                  <li><NavLink className="signin" activeStyle={{color: "white"}} to="/signin">Sign In</NavLink></li>
                </ul>
            )}
          </nav>
      </div>
    </header>
  )
}

export default Header;

