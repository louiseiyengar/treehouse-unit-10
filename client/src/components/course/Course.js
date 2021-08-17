import React from 'react';

function Course ({ course }) {
  return (
    <a className="course--module course--link" href={`courses/${course.id}`}>
      <h2 className="course--label">Course</h2>
      <h3 className="course--title">{ course.title }</h3>
    </a>
  )
}

export default Course;
