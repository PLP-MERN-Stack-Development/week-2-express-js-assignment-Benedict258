class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message });
};

module.exports = {
  NotFoundError,
  ValidationError,
  errorHandler
};
