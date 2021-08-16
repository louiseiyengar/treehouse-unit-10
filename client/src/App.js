import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Header from './components/Header';
import PrivateRoute from './PrivateRoute';

import UserSignIn from './components/authorization/UserSignIn';
import UserSignUp from './components/authorization/UserSignUp';
import UserSignOut from './components/authorization/UserSignOut';

import Courses from './components/course/Courses';
import CourseDetail from './components/course/CourseDetail';
import CreateCourse from './components/course/CreateCourse';
import UpdateCourse from './components/course/UpdateCourse'

function App() {
  return (
    <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={ Courses } />
          <PrivateRoute path="/courses/create" component={ CreateCourse } />
          <PrivateRoute path="/courses/:id/update" component={ UpdateCourse } />
          <Route path="/courses/:id" component={ CourseDetail } />
          <Route path="/signin" component={ UserSignIn } />
          <Route path='/signup' component={ UserSignUp } />
          <Route path="/signout" component={ UserSignOut } />
        </Switch>
    </Router>
    
  )
}

export default App;
