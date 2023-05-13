const BadRequest = require('./bad-request-error');
const Conflict = require('./conflict-error');
const Forbidden = require('./forbidden-error');
const InternalServer = require('./internal-server-error');
const NotFound = require('./not-found-error');
const Unautorized = require('./unautorize-error');

module.exports = {
  BadRequest,
  Conflict,
  Forbidden,
  InternalServer,
  NotFound,
  Unautorized,
};
