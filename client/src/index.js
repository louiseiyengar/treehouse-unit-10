/*
  Treehouse FSJS - Project 10
  The client portion of this project uses React make API calls to a database of Users and Courses.
  It allows users to sign in, and retrieve, create, update and delete courses via API calls.
*/
import React from 'react';
import ReactDOM from 'react-dom';

import './styles/reset.css';
import './styles/global.css';

import Provider from './Context';
import App from './App';

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root')
);
