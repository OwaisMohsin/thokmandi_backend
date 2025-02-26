// module imports
const express = require("express");
const cors = require("cors");
const path = require("path");
const errorHandler = require("./src/middlewares/error-handler");

// file imports
require("./src/config/env-config");
const apiRoutes = require("./src/routes/index");

// variable initializations
const app = express();
const port = process.env.PORT || 5001;

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "*",
    withCredentials: true,
  })
);

app.set("views", path.join(__dirname, "src", "views"));
app.set("view engine", "ejs");

// mount routes
app.use("/api/v1", apiRoutes);

// Global Error Handler (MUST be placed after all routes)
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

console.log(process.env.NODE_ENV.toUpperCase());
