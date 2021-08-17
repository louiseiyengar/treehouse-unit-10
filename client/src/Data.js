
class Data {
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
  async getCourses (id = null) {
    const response = id ?
      await this.api(`/courses/${id}`) :
      await this.api('/courses');

      let data = await response.json();
      data.status = response.status;
      return data;
  }

  async deleteCourse (courseId, user) {
    const emailAddress = user.emailAddress;
    const password = atob(user.password);
    const response = await this.api(`/courses/${courseId}`, 'DELETE', null, true, { emailAddress, password });
    return response;
  }

  async createUpdateCourse(course, user, id = null) {
    const emailAddress = user.emailAddress;
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
    if (response.status === 400) {
      return response.json().then(data => {
        data.status = response.status
        return data;
      });
    }
    else {
      return response;
    }
   }

  //USER METHODS
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
      
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
 
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
