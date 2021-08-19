import React from 'react';
import CreateUpdateCourse from './CreateUpdateCourse';

/**
  This component will return the CreateUpdateCourse component to create a course.
   It will pass a null course id (id) through props.
*/
function CreateCourse() {
  return (
    <CreateUpdateCourse id={null} />
  )
}

export default CreateCourse
