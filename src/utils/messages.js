const { errors } = require('./errors');

const codeBadRequest = 400;
const codeConflict = 409;
const codeUnauthorized = 401;

// referência: https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status

const msgBadRequest = { status: codeBadRequest, message: errors.errorEntries };
const msgConflict = { status: codeConflict, message: errors.errorSameEmail };
const msgUnauthorizedNull = { status: codeUnauthorized, message: errors.errorNullInput };
const msgUnauthorizedIncorrect = { status: codeUnauthorized, message: errors.errorIncorrectInput };
const msgBadJWT = { status: codeUnauthorized, message: errors.errorIncorrectJWT };

module.exports = {
  msgBadRequest,
  msgConflict,
  msgUnauthorizedNull, 
  msgUnauthorizedIncorrect,
  msgBadJWT,
};
