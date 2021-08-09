import React, { Component } from "react";
import Data from './Data';

export const Context = React.createContext(); 

export class Provider extends Component {

  render () {
    const value = {
      actions: {
        getCourses: this.getCourses
      }
    }
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    )
  }
  
  getCourses = async(id = null) => {
    const data = new Data();
    const allCourses = await data.getCourses(id);
    return allCourses;
  } 

  // getCourse = async(id) => {
  //   const data = new Data();
  //   const course = await data.getCourse(id);
  //   return course;
  // }
}

export default Provider;
