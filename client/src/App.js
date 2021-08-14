import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Header from './components/Header';

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
      <React.Fragment>
        <Header />
        <Switch>
          <Route exact path="/" component={Courses} />
          <Route path="/courses/create" component={CreateCourse} />
          <Route path="/courses/:id/update" component={UpdateCourse} />
          <Route path="/courses/:id" component={CourseDetail} />
          <Route path="/signin" component={UserSignIn} />
          <Route path='/signup' component={UserSignUp} />
          <Route path="/signout" component={UserSignOut} />
        </Switch>
      </React.Fragment>
    </Router>
    
  )
}

export default App;
