import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import { Context } from "../Context";

function CourseDetail() {
  const context = useContext(Context);
  const [course, setCourse] = useState({});
  const [user, setUser] = useState({});
  const [description, setDescription] = useState('');
  const [materials, setMaterials] = useState('');

  const { id } = useParams();

  useEffect(() => {
    context.actions.getCourses(id)
    .then(data => {
      setCourse(data);
      setUser(data.User);
      setDescription(data.description);
      setMaterials(data.materialsNeeded);
    })
  },[]);

  return (
    <main>
      <div className="actions--bar">
          <div className="wrap">
              <a className="button" href={`/courses/${id}/update`}>Update Course</a>
              <a className="button" href="update-course.html">Delete Course</a>
              <a className="button button-secondary" href="/">Return to List</a>
          </div>
      </div>
            
      <div className="wrap">
        <h2>Course Detail</h2>
        <div className="main--flex">
          <div>
            <h3 className="course--detail--title">Course</h3>
            <h4 className="course--name">{course.title}</h4>
            <p>By {`${user.firstName} ${user.lastName}`}</p>
            <ReactMarkdown>{description}</ReactMarkdown>
          </div>
          <div>
            <h3 className="course--detail--title">Estimated Time</h3>
            <p>{course.estimatedTime ? course.estimatedTime : 'No Estimated Time Set'}</p>
            <h3 className="course--detail--title">Materials Needed</h3>
              <ul className="course--detail--list">
                {materials ?
                  <ReactMarkdown>{materials}</ReactMarkdown>
                  :
                  <li>No Materials Needed</li>
                }
              </ul> 
          </div>
        </div>
      </div>
    </main>
  )
}

export default CourseDetail
