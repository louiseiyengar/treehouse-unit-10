import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import { Context } from '../../Context';

/*
  This component will retrieve and display all information about one course, and it will
  retrieve information about the user who owns that course.

  If the user is authenticated and owns the course, a sub navigation bar will appear with buttons
  allowing the user to delete or update the course.  If the user is not signed in or the user doesn't
  own the course, the sub navigation bar will not display these buttons and will only have a button
  linking to the home page.

  This component will also handle the course delete.
*/
function CourseDetail() {
  const context = useContext(Context);
  const [course, setCourse] = useState({});
  const [user, setUser] = useState({});
  const [description, setDescription] = useState('');
  const [materials, setMaterials] = useState('');
  const [loading, setLoading] = useState(true)

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    //call the Data object's getCourses method.  Because an
    //id existed in the URI, getCourses will retrieve this one course.
    context.data.getCourses(id)
    .then(data => {
      //course not found
      if (data.status === 404) {
        history.push('/notfound');
      //course successfully found
      } else if (data.status === 200) {
        setCourse(data);
        setUser(data.User);
        setDescription(data.description);
        setMaterials(data.materialsNeeded);
        setLoading(false);
      } else {
        history.push('/error')
      }
    })
    .catch((err) => {
      console.log(err);
      history.push('/error');
    });
  },[id, context.data, history]);

  //note that the delete button will only appear if user authenticated.
  const handleDelete = () => {
    user.password = context.authenticatedUser.password;
    context.data.deleteCourse(id, user)
    .then(response => {
      //delete successful. go to home page.
      if (response.status === 204) {
        history.push('/')
      } else {
        history.push('/error')
      }
    })
    .catch((error) => {
      console.error(error);
      history.push('/error');
    });
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
        {(!loading) ? (
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
        ) : (
          <h3>Loading...</h3>
        )}
      </div>
    </main>
  )
}

export default CourseDetail
