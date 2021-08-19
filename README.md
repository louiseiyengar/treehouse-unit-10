# FSJS Project 10 - React Client for School Database REST API.

For this project, I created a React client for a school database.  The database is accessed through REST api calls made using JavaScript's fetch method.  The API uses the Express Web Application Framework, the Sequelize ORM, and a SQLite database.

Information about the clent project:
* There is a sign up screen where a user can sign up to gain permission to create, update, and delete courses.
* There is a sign in screen to authenticate users
* An authenticated who creates a course, owns that course
* Private Routes to ensure only authenticated users, who own the course, can create and update the course.
* The home screen shows boxes with the titles of all courses.  A user can click on the box to view the courses's details screen.
* The course details screen will display of sub-navigation menu that has a button that links to the home screen.
* The course details screen sub-navigation menu will only display Update Course or Delete Course button links if the user is authenticated and owns the course.
* The API calls use Basic Auth to send a user email and password to authenticate a user.
* Authenticated User information is stored in a Cookie, so a user remains authenticated for 1 day, unless the user signs out.

======= Instuctions to view project locally =========
1. To run this project locally, you must have node.js and npm installed.
1. Download or clone the project from this repo.
1. Open a terminal window, if you don't have one opent. You will see two folders in the project.  Navigate into the 'api' folder.
Run the following:
  * npm install
  * npm run seed (you should finally see the text, 'Database successfully initialized'.
  * npm start (you should finally see the text, 'Successful database connection')
1. Open another terminal window.  Navigate into the 'client' folder.
Run the following: 
  * npm install
  * npm start (this should bring up a browser window at URI: localhost:3000)

=====================================================

Screenshot of the Course Details Page for an Authenticaed User.

