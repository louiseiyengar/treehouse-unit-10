
class Data {
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const apiBaseUrl = 'http://localhost:5000/api/';
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

  async getCourses (id = null) {
    const response = id ?
      await this.api(`courses/${id}`) :
      await this.api('courses')
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      return null;
    }
  }

  // async getCourse (id) {
  //   console.log("id: " + id);
  //   const response = await this.api(`courses/:${id}`)
  //   if (response.status === 200) {
  //     const data = await response.json();
  //     return data;
  //   } else {
  //     return null;
  //   }
  // }
}

export default Data;