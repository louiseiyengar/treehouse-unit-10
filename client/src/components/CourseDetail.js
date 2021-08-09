import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from "../Context";

function CourseDetail() {
  const context = useContext(Context);
  const [course, setCourse] = useState({});
  const [user, setUser] = useState({});
  const [description, setDescription] = useState('');
  const [materials, setMaterials] = useState('');

  let { id } = useParams();

  function Description(props) {
    let paragraphArray = props.paragraphs.split('\n\n');
    const paragraphs = paragraphArray.map((paragraph, index) => 
      <p key={ index+1 }>{ paragraph }</p>
    );

    return (
      <React.Fragment>
        { paragraphs }
      </React.Fragment>
    )
  }

  function Materials(props) {
    const materialsArray = props.materials.trim().replace(/\* /g, '').split('\n');
    const materials = materialsArray.map((material, index) => 
      <li key={ index+1 }>{ material }</li>
    );

    return (
      <ul className="course--detail--list">
        { materials }
      </ul>
    )
  }

  useEffect(() => {
    console.log('useEffect called!');
    console.log(id);
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
              <a className="button" href="update-course.html">Update Course</a>
              <a className="button" href="delete-course.html">Delete Course</a>
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
            {description ? <Description paragraphs={description} /> : null}`
          </div>
          <div>
            <h3 className="course--detail--title">Estimated Time</h3>
            <p>{course.estimatedTime ? course.estimatedTime : 'No Estimated Time set'}</p>
            <h3 className="course--detail--title">Materials Needed</h3>
            {materials ? <Materials materials={materials} /> : <p>No Materials required</p>}
          </div>
        </div>
      </div>
    </main>
  )
}

export default CourseDetail
