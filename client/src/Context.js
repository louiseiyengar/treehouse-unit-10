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

    /**
   * Uses email address and password to get authenticated user, set authenticated user as a property of
   * Context's state, and put Authenticated User information in a Cookie to last one day. 
   * 
   * @param {string}  emailAddress
   * @param {string}  password
   * @return {object} - response 
   */
  signIn = async (emailAddress, password) => {
    const response = await this.data.getUser(emailAddress, password);
   
    //no user could be found with this email address and/or password
    if (response.status === 401) {
      response.errors = ['Email Address and/or Password Are Incorrect'];
    //Email improperly formatted will cause a 400 validation error
    } else if (response.status === 400) {
      response.errors = ['Please be sure you have entered a properly formatted Email Address']
    } else if (response.status === 200) {
        //encrypt password for authenticatedUser property and for Cookie.
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
