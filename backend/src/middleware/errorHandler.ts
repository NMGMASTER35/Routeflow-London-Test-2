// Basic error handler middleware for Express
export function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(500).json({ error: err.message || 'Internal server error' });
}
