 /**
  * This Class contains functions that make the API calls to:
  * Signin and Signout a user.
  * To get Course infomation and create, update, and delte courses
   */
class Data {
   /**
   * Helper method to format and execute API's.  Users Fetch API to make calls.
   * 
   * @param {string} path - the URI for the API call
   * @param {string} method - API method
   * @param {object} body - object of name:value pairs if information needs to be 
   * sent in body of API
   * @param {boolean} requiresAuth - does API require user authorization
   * @param {object} credentials - if authorization required, email address and password
   * will be put in the header of the API call.  Uses Basic Auth.
   * @return {promise} - the Promise result of the Fetch API
   */
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const apiBaseUrl = 'http://localhost:5000/api';
    const url = apiBaseUrl + path;

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }

  //COURSE METHODS

  /**
   * Note that this method is used to call the API method to both
   * 1) Return a JSON object with ALL COURSES
   * 2) Return a JSON object for ONE COURSE.
   * The id parameter will determine if the API should return all or
   * one course
   * 
   * @param {number} id  the course id, will be numeric if retrieving one course, null for all courses
   * @return {object} - JSON object with response status and course data.
   */
  async getCourses (id = null) {
    const response = id ?
      await this.api(`/courses/${id}`) :
      await this.api('/courses');

      let data = await response.json();
      data.status = response.status;
      return data;
  }

  /**
   * Note that this method is used to call the API method to delete a course
   * 
   * @param {number} courseId the course id of the course to delete
   * @param {object} user - object contains user information, used to get email address
   * and password to check if user authorized to delete course
   * @return {object} - JSON with response status
   */
  async deleteCourse (courseId, user) {
    const emailAddress = user.emailAddress;
    const password = atob(user.password);
    const response = await this.api(`/courses/${courseId}`, 'DELETE', null, true, { emailAddress, password });
    return response;
  }

   /**
   * Note that this method is used to call the API method to both
   * 1) Create a Course
   * 2) Update a Course
   * The id parameter will determine if the API should Create a Course or 
   * Update a Course.
   * 
   * @param {number} id  the course id, if Updating a course, null if creating a course.
   * @return {object} - JSON object with response status and course data.  If error 400
   * validation errors, will return an array of all validation
   * error messages.
   */
  async createUpdateCourse(course, user, id = null) {
    const emailAddress = user.emailAddress;
    //the password is passed in btoa encoded.  It needs to be
    //decoded to pass it to the api method,
    const password = atob(user.password);
    let method = '';
    let URI = ''
    if (id) {
      //update course
      method = "PUT"
      URI = `/courses/${id}`;
    } else {
      //create course
      method = "POST"
      URI = `/courses/`;
    }

    const response = await this.api(URI, method, course, true, { emailAddress, password });
    //validation errors - return array of error messages
    if (response.status === 400) {
      return response.json().then(data => {
        data.status = response.status;
        return data;
      });
    }
    else {
      return response; 
    }
   }

  //USER METHODS
  /**
   * Uses emailAddress and password to make call API function to retrieve a user
   * 
   * @param {string} emailAddress  email address of user to retrieve
   * @param {string} password - unencrypted password of user to retrieve
   * @return {object} - JSON object with response status and user data or error
   * response with status code.
   */
  async getUser(emailAddress, password) {
    const response = await this.api('/users', 'GET', null, true, { emailAddress, password });
    if (response.status === 200) {
      return response.json().then(data => {
        data.status = response.status;
        return data;
      })
    }
    else {
      return response;
    }
  }
    /**
   * Uses user information to make call to API function to create a new user
   * 
   * @param {object} user - object of user information
   * @return {object} - JSON object with response status.  If validation errors, returns response
   * status and an array of error objects
   */
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    //validation errors - return array of validation messages
    if (response.status === 400) {
      return response.json().then(data => {
        data.status = response.status;
        return data;
      });
    }
    else {
      return response;
    }
   }
}

export default Data;
