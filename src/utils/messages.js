const { errors } = require('./errors');
const { codeBadRequest, codeConflict, 
  codeUnauthorized, codeNotFound, codeNoContent, codeForbidden } = require('./dictionary');

const msgBadRequest = { status: codeBadRequest, message: errors.errorEntries };
const msgConflict = { status: codeConflict, message: errors.errorSameEmail };
const msgUnauthorizedNull = { status: codeUnauthorized, message: errors.errorNullInput };
const msgUnauthorizedIncorrect = { status: codeUnauthorized, message: errors.errorIncorrectInput };
const msgBadJWT = { status: codeUnauthorized, message: errors.IncorrectJWT };
const msgNotFoundRecipe = { status: codeNotFound, message: errors.notFoundRecipe };
const msgMissingToken = { status: codeUnauthorized, message: errors.missingAuthToken };
const msgNoContent = { status: codeNoContent, message: '' };
const msgForbidden = { status: codeForbidden, message: errors.forbidden };

module.exports = {
  msgBadRequest,
  msgConflict,
  msgUnauthorizedNull, 
  msgUnauthorizedIncorrect,
  msgBadJWT,
  msgNotFoundRecipe,
  msgMissingToken,
  msgNoContent,
  msgForbidden,
};
