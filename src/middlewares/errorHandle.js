module.exports = (err, req, res, _next) => res.status(500).json({ 
  message: 'internal server error',
});
