module.exports = class UnautorizedError extends Error {
  constructor(message) {
    super(message);
    this.status = 401;
  }
};
