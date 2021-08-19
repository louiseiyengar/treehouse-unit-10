import React from 'react';

/**
 * This component will display validation errors for the UserSignIn, UserSignUp and CreateUpdateCoursse
 * components.  It will be passed an array of error validation message to display.
 */
function ErrorsDisplay({ errors }) {
  let errorsDisplay = null;
  if (errors.length) {
    errorsDisplay = (
      <div className="validation--errors">
        <h3>Validation Errors</h3>
          <ul>
            {errors.map((error, i) => <li key={i}>{error}</li>)}
          </ul>
      </div>
    );
  }

  return errorsDisplay;
}

export default ErrorsDisplay;
