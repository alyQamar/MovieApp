const express = require("express");
const ApiError = require("../utils/apiError");
const categoryRoute = require("../routes/categoryRoute");

const globalError = require("./errorMiddleware");

const app = express();
app.use(express.json());

// Mount Routes
app.use("/categories", categoryRoute);

// Handle Unhandled Routes and Send Error to Error Handling Middleware
app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find this route ${req.originalUrl}`, 400));
});

// Global Express Error Handler middleware
app.use(globalError);

module.exports = app;
