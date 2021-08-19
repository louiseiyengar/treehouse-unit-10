import React from 'react';
import { useParams } from 'react-router-dom';
import CreateUpdateCourse from './CreateUpdateCourse';

/**
  This component will return the CreateUpdateCourse component to update a course.
   It will pass a the numeric course id (id) through props.
*/
function UpdateCourse() {
  const { id } = useParams();

  return (
    <CreateUpdateCourse id={id} />
  )
}

export default UpdateCourse
