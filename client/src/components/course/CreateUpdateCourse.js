import React, {useEffect, useState, useContext} from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../../Context';

import ErrorsDisplay from '../ErrorsDisplay';

/*
  This component will render the form for both the Create Course and Update Course paths.  When 
  props is passed in with a numeric course id (property: id), then the form is to be used to update 
  the course with that id.  Note that only an authenticated user who owns the course can update it.

  If the prop.id is null, the form is to be used to create a course. The current authenticated user
  will own the course.
*/
function CreateUpdateCourse (props) {
  const context = useContext(Context);
  let history = useHistory();

  //course id sent in as property with props. if null, then form used to create a course
  const { id } = props;
  const displayText = id ? "Update Course" : "Create Course";

  const [title, setCourseTitle] = useState('');
  const [description, setCourseDescription] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [materialsNeeded, setMaterialsNeeded] = useState('');
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);

  const handleChange = (event) => {
    const value = event.target.value;
    switch (event.target.name) {
      case "title":
        setCourseTitle(value);
        break;
      case "description":
        setCourseDescription(value);
        break;
      case "estimatedTime":
        setEstimatedTime(value);
        break;
      case "materialsNeeded":
        setMaterialsNeeded(value);
        break;
      default:
        return;
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // Create user
    const authenticatedUser = context.authenticatedUser;
    const userId = authenticatedUser.id;

    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId
    };

    context.data.createUpdateCourse(course, authenticatedUser, id)
    .then( response => {
      //validation errors must be displayed
      if (response.status === 400) {
        setErrors(response.message);
      //update or create course successful, redirect to home page.
      } else if ((response.status === 204) || (response.status === 201)) {
        history.push('/');
      } else {
        history.push('/error');
      }
    })
    .catch((err) => {
      console.log(err);
      history.push('/error');
    });
  }

  const handleCancel = () => {
    history.push('/');
   }

  useEffect(() => {
    //if id is numeric, it is a course update, and initially, form fields must be
    //filled, so course data must be retrieved.
    if (id) {
      context.data.getCourses(id)
      .then(data => {
        //data of user who owns the course
        const { User } = data;
        if (data.status === 404) {
          history.push('/notfound')
        //userid of course owner must be the same as the id of the authenticated user
        }else if (User.id !== context.authenticatedUser.id) {
          history.push('/forbidden')
        } else {
          setCourseTitle(data.title);
          setCourseDescription(data.description);
          setEstimatedTime(data.estimatedTime);
          setMaterialsNeeded(data.materialsNeeded);
          setLoading(false);
        }
    })
  } else {
    //if this is a course creation, don't get data.
    setLoading(false);
  }
  },[id, context.authenticatedUser.id, context.data, history]);

  return (
    <main>
      <div className="wrap">
        <h2>{ displayText }</h2>
        {(!loading) ? (
        <React.Fragment>
          <ErrorsDisplay errors={ errors } />
          <form onSubmit={ handleSubmit }>
            <div className="main--flex">
              <div>
                <label htmlFor="courseTitle">Course Title</label>
                <input id="courseTitle" name="title" type="text" onChange={ handleChange } value={ title } />

                <p>By { `${context.authenticatedUser.firstName} ${context.authenticatedUser.lastName}` }</p>

                <label htmlFor="courseDescription">Course Description</label>
                <textarea id="courseDescription" name="description" onChange={ handleChange } value={ description } />
              </div> 
              <div>
                <label htmlFor="estimatedTime">Estimated Time</label>
                <input id="estimatedTime" name="estimatedTime" type="text" onChange={ handleChange } value={ estimatedTime } />

                <label htmlFor="materialsNeeded">Materials Needed</label>
                <textarea id="materialsNeeded" name="materialsNeeded" onChange={ handleChange } value={ materialsNeeded } />
              </div>
            </div>
            <button className="button" type="submit">{ displayText }</button>
            <button className="button button-secondary" onClick={ handleCancel }>Cancel</button>
          </form>
        </React.Fragment>
        ) : (
          <h3>Loading...</h3>
        )}
      </div> 
    </main>
  )
}

export default CreateUpdateCourse;
