import React, { createContext, useEffect, useState } from "react";
import Data from './Data';

export const Context = createContext();

function Provider({ children }) {
  const [courses, setCourses] = useState([]);
  
  setCourses(allCourses());
  console.log(courses);
  const value = {
    courses
  }
  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

async function allCourses() {
  const data = new Data();
  const test = await data.getCourses();
  console.log("in getCourses", test);
  return test;
}

export default Provider;