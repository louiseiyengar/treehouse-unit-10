import React, { createContext, useState } from "react";
import Data from './Data';

export const Context = createContext();

function Provider({ children }) {
  const data = new Data();
  const [courses, setCourses] = useState([{id: 1, name: "Make Bread"}, {id: 2, name: "Make Mashed Potatoes"}]);

  const value = {
    courses
  }
  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

export default Provider;