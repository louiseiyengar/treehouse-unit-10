import React, {useState, useContext} from 'react';
import { Link, useHistory } from 'react-router-dom';
import Form from '../Form';
import { Context } from '../../Context';


function CreateCourse() {
  const context = useContext(Context);
  let history = useHistory();

  const [title, setCourseTitle] = useState('');
  const [description, setCourseDescription] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [materialsNeeded, setMaterialsNeeded] = useState('');
  const [errors, setErrors] = useState([]);

  const handleChange = (event) => {
    const value = event.target.value;
    switch (event.target.name) {
      case "courseTitle":
        setCourseTitle(value);
        break;
      case "courseDescription":
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

    context.data.createCourse(course, authenticatedUser)
    .then( errors => {
      if (errors.length) {
        setErrors(errors);
      } else {
        history.push('/');
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

  return (
    <main>
      <div className="wrap">
        <h2>Create Course</h2>
        <form onSubmit={ handleSubmit }>
          <div className="main--flex">
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input id="courseTitle" name="courseTitle" type="text" onChange={ handleChange } value={ title } />

              <p>By { `${context.authenticatedUser.firstName} ${context.authenticatedUser.lastName}` }</p>

              <label htmlFor="courseDescription">Course Description</label>
              <textarea id="courseDescription" name="courseDescription" onChange={ handleChange } value={ description } />
            </div> 
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input id="estimatedTime" name="estimatedTime" type="text" onChange={ handleChange } value={ estimatedTime } />

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea id="materialsNeeded" name="materialsNeeded" onChange={ handleChange } value={ materialsNeeded } />
            </div>
        </div>
        <button className="button" type="submit">Create Course</button>
        <button className="button button-secondary" onClick={ handleCancel }>Cancel</button>
      </form>
      </div> 
    </main>
  )
}

export default CreateCourse