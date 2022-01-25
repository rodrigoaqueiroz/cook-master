const errors = { 
  errorEntries: 'Invalid entries. Try again.',  
  errorSameEmail: 'Email already registered', 
  errorNullInput: 'All fields must be filled',  
  errorIncorrectInput: 'Incorrect username or password',  
  IncorrectJWT: 'jwt malformed',
  notFoundRecipe: 'recipe not found',
  missingAuthToken: 'missing auth token',
  forbidden: 'Only admins can register new admins',
};

module.exports = {
  errors,
};
