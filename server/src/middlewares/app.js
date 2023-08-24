const express = require("express");
const ApiError = require("../utils/apiError");
const globalError = require("./errorMiddleware");
var cors = require('cors')
// Routes
const categoryRoute = require("../routes/categoryRoute");
// const actorRoute = require("../../../draft/actor/actorRoute");
const movieRoute = require("../routes/movieRoute");
const userRoute = require("../routes/userRoute");
const authRoute = require("../routes/authRoute");

const app = express();

app.use(express.json());
app.use(cors())

// Mount Routes
app.use("/categories", categoryRoute);
// app.use("/actors", actorRoute);
app.use("/movies", movieRoute);

app.use("/users", userRoute);

app.use("/auth", authRoute);

// Handle Unhandled Routes and Send Error to Error Handling Middleware
app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find this route ${req.originalUrl}`, 400));
});

// Global Express Error Handler middleware
app.use(globalError);

module.exports = app;
