module.exports = class UnautorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
};
