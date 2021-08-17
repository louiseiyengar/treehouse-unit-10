import React from 'react';
import { useParams } from 'react-router-dom';
import CreateUpdateCourse from './CreateUpdateCourse';

function UpdateCourse() {
  const { id } = useParams();

  return (
    <CreateUpdateCourse id={id} />
  )
}

export default UpdateCourse
