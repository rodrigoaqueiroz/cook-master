module.exports = (err, _req, response, _next) => {
  if (err.status) return response.status(err.status).json({ message: err.message });
  return response.status(err.status).json({ message: err.message });
};

// app.use((err, _request, response, _next) => {
//   if (err.status) return response.status(err.status).json({ message: err.message });
//   return response.status(500).json({ message: err.message });
// });