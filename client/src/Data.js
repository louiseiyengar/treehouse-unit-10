
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
      const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }

  //COURSE METHODS
  async getCourses (id = null) {
    const response = id ?
      await this.api(`/courses/${id}`) :
      await this.api('/courses')
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      return null;
    }
  }

  async deleteCourse (courseId, user) {
    const username = user.emailAddress;
    const password = atob(user.password);
    const response = await this.api(`/courses/${courseId}`, 'DELETE', null, true, { username, password });
    return response;
  }

  async createCourse(course, user) {
    const username = user.emailAddress;
    const password = atob(user.password);

    const response = await this.api('/courses', 'POST', course, true, { username, password });
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
   }

  //USER METHODS
  async getUser(username, password) {
    const response = await this.api('/users', 'GET', null, true, { username, password });
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }
      
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
   }
}

export default Data;
