'use strict';

// Simple tool function used to return http error object & log in console
// when an error occurs.
// Usage:
// Status = 404 (example), code = 'USER_NOT_FOUND', msg = 'User not found.' ,
// functionCalled = 'updateUserAvatar'.

module.exports = function generateError(status, code, message, functionCalled) {
  if (status && code && message && functionCalled) {
    console.error(`Error in ${functionCalled}`);
    let err = new Error(message);
    err = {status, code, message};
    console.log(err);
    return err;
  }
};
