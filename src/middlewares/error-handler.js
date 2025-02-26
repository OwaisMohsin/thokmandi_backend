const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong!";

  // Handle Zod validation errors
  if (err.name === "ZodError") {
    statusCode = 400;
    message = err.errors.map(e => e.message).join(", "); // Extracting Zod error messages
  }

  // console.error(`❌ Error: ${message} (Status: ${statusCode})`);

  res.status(statusCode).json({
    status: err.status || "error",
    message: message,
    errors: err.errors || undefined, // Include validation errors if present
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined, // Show stack trace only in dev
  });
};

module.exports = errorHandler;
