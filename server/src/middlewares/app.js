const express = require("express");
const ApiError = require("../utils/apiError");
const globalError = require("./errorMiddleware");
// Routes
const categoryRoute = require("../routes/categoryRoute");
// const actorRoute = require("../../../draft/actor/actorRoute");
const movieRoute = require("../routes/movieRoute");

const app = express();
app.use(express.json());

// Mount Routes
app.use("/categories", categoryRoute);
// app.use("/actors", actorRoute);
app.use("/movies", movieRoute);

// Handle Unhandled Routes and Send Error to Error Handling Middleware
app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find this route ${req.originalUrl}`, 400));
});

// Global Express Error Handler middleware
app.use(globalError);

module.exports = app;
