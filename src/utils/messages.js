const { errors } = require('./errors');
const { codeBadRequest, codeConflict, codeUnauthorized, codeNotFound } = require('./dictionary');

// referência: https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status

const msgBadRequest = { status: codeBadRequest, message: errors.errorEntries };
const msgConflict = { status: codeConflict, message: errors.errorSameEmail };
const msgUnauthorizedNull = { status: codeUnauthorized, message: errors.errorNullInput };
const msgUnauthorizedIncorrect = { status: codeUnauthorized, message: errors.errorIncorrectInput };
const msgBadJWT = { status: codeUnauthorized, message: errors.IncorrectJWT };
const msgNotFoundRecipe = { status: codeNotFound, message: errors.notFoundRecipe };
const msgMissingToken = { status: codeUnauthorized, message: errors.missingAuthToken };

module.exports = {
  msgBadRequest,
  msgConflict,
  msgUnauthorizedNull, 
  msgUnauthorizedIncorrect,
  msgBadJWT,
  msgNotFoundRecipe,
  msgMissingToken,
};
