import React, { Component } from "react";
import Data from './Data';

export const Context = React.createContext(); 

export class Provider extends Component {
  
  state = {
    courses: [],
  };

  
  render () {
    const value = {
      courses: this.state.courses,
      actions: {
        getAllCourses: this.getAllCourses
      }
    }
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    )
  }
  
  getAllCourses = async() => {
    const data = new Data();
    const allCourses = await data.getCourses();
    if (allCourses) {
      this.setState(() => {
        return {
          courses: allCourses
        }
      });
    }
  } 
}


export default Provider;