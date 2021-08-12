import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

export const Context = React.createContext(); 

export class Provider extends Component {
  state = {
    authenticatedUser: Cookies.get('authenticatedUser') ?
      JSON.parse(Cookies.get('authenticatedUser')) : null
  };

  data = new Data();

  render () {
    const value = {
      authenticatedUser: this.state.authenticatedUser,
      actions: {
        getCourses: this.getCourses,
        signIn: this.signIn,
        signOut: this.signOut
      }
    }
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    )
  }
  
  getCourses = async(id = null) => {
    const allCourses = await this.data.getCourses(id);
    return allCourses;
  } 

  signIn = async (username, password) => {
    const user = await this.data.getUser(username, password);

    if (user !== null) {
      this.setState(() => {
        return {
          authenticatedUser: user,
        };
      });
      const userString = JSON.stringify(user);
      Cookies.set('authenticatedUser', userString, { expires: 1 });
    }
    return user;
  }

  signOut = () => {
    this.setState({ authenticatedUser: null });
    Cookies.remove('authenticatedUser');
  }
}

export default Provider;
