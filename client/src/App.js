import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';

function App() {
  return (
    <Router>
      <React.Fragment>
        <Header />

        <Switch>
          <Route exact path="/" component={Courses} />
          <Route path="/courses/:id" component={CourseDetail} />
        </Switch>
      </React.Fragment>
    </Router>
    
  )
}

export default App;
