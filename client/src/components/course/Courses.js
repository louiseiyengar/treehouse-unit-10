import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Context } from "../../Context";

import Course from './Course';
import cross from '../../images/cross.svg';

/*
  This component calls the data object's getCourses method to get all courses
  existing for this application.  It diplays that title of each course in a box that
  links to a course details page.

  The component also displays a box that will allow a user to add a course.
*/
function Courses() {
  const context = useContext(Context);
  const history = useHistory();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    context.data.getCourses()
    .then(data => {
      setCourses(data);
      setLoading(false)
    })
    .catch((error) => {
      console.error(error);
      history.push('/error')
    })
  },[context.data, history]);

  return (
    <main>
      <div className="wrap main--grid">
        { loading ? <h3>Loading...</h3> : 
          courses ? courses.map((course) => <Course key={course.id} course={course} />) :
          <h3>No courses currently available</h3>
        }
        <Link className="course--module course--add--module" to={'/courses/create'}>
          <span className="course--add--title">
            <img src={cross} alt="cross" className="add" />
            New Course
          </span>
        </Link>
      </div>
    </main>
  )
}

export default Courses;
