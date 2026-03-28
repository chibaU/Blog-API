const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Mongoose: document not found
  if (err.name === 'CastError') {
    return res.status(404).json({ message: 'Resource not found' });
  }

  // Mongoose: duplicate key (email أو username موجود مسبقاً)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({ message: `${field} already exists` });
  }

  // Mongoose: validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({ message: messages.join(', ') });
  }

  // JWT: token منتهي
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ message: 'Token expired' });
  }

  // Default
  res.status(err.statusCode || 500).json({
    message: err.message || 'Server error',
  });
};

module.exports = errorHandler;