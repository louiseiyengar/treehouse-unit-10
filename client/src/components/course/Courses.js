import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../../Context";

import Course from './Course';
import cross from '../../images/cross.svg';

function Courses() {
  const context = useContext(Context);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    context.actions.getCourses()
    .then(data => {
      setCourses(data);
      setLoading(false)
    })
  },[]);

  return (
    <main>
      <div className="wrap main--grid">
        { loading ? <h3>Loading...</h3> : 
          courses ? courses.map((course) => <Course key={course.id} course={course} />) :
          <h3>No courses currently available</h3>
        }
        <a className="course--module course--add--module" href="create-course.html">
            <span className="course--add--title">
              <img src={cross} alt="cross" className="add" />
              New Course
            </span>
        </a>
      </div>
    </main>
  )
}

export default Courses;
