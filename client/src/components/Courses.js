import React, { useContext } from 'react';
import { Context } from '../Context';

import Course from './Course';
import cross from '../images/cross.svg';

function Courses() {
  const { courses } = useContext(Context);

  return (
    <main>
      <div className="wrap main--grid">
          { courses.map((course) => <Course key={course.id} course={course}  />) }
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
