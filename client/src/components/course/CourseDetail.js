import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import { Context } from '../../Context';

function CourseDetail() {
  const context = useContext(Context);
  const [course, setCourse] = useState({});
  const [user, setUser] = useState({});
  const [description, setDescription] = useState('');
  const [materials, setMaterials] = useState('');

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    context.data.getCourses(id)
    .then(data => {
      setCourse(data);
      setUser(data.User);
      setDescription(data.description);
      setMaterials(data.materialsNeeded);
    })
  },[id]);

  const handleDelete = () => {
    user.password = context.authenticatedUser.password;
    context.data.deleteCourse(id, user)
    .then(response => {
      if (response.status === 204) {
        history.push('/')
      } else {
        throw Error();
      }
    })
  }

  return (
    <main>
      <div className="actions--bar">
          <div className="wrap">
              {context.authenticatedUser && (context.authenticatedUser.id === user.id) ? (
                <React.Fragment>
                  <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
                  <button className="button" onClick={handleDelete}>Delete Course</button>
                  <Link className="button button-secondary" to={'/'}>Return to List</Link>
                </React.Fragment>
              ) : (
                <Link className="button button-secondary" to={'/'}>Return to List</Link>
              )}
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
