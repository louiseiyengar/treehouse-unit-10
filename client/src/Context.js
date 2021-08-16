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
      data: this.data,
      actions: {
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

  signIn = async (emailAddress, password) => {
    const response = await this.data.getUser(emailAddress, password);

    if (response.status && (response.status === 401)) {
      response.errors = ['Email Address and/or Password Are Incorrect']
      //if emailAddress is in response object, a validated user has been found
    } else if (response.emailAddress) {
        response.password = btoa(password);
        response.errors = [];
        this.setState(() => {
          return {
            authenticatedUser: response,
          };
        });
        const userString = JSON.stringify(response);
        Cookies.set('authenticatedUser', userString, { expires: 1 });
    }
    return response;
  }

  signOut = () => {
    this.setState({ authenticatedUser: null });
    Cookies.remove('authenticatedUser');
  }
}

export default Provider;
