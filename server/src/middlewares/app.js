const express = require("express");
const categoryRoute = require("../routes/categoryRoute");
const app = express();
const { query, validationResult } = require("express-validator");
const ApiError = require("../utils/apiError");
const globalError = require("./errorMiddleware");
app.use(express.json());

// Mount Routes
app.use("/categories", categoryRoute);

// Handle Unhandled Routes and Send Error to Error Handling Middleware
app.all("*", (req, res, next) => {
  next(new ApiError("an't find this route ${req.originalUrl}", 400));
});

// Global Express Error Handler middleware
app.use(globalError);

module.exports = app;
