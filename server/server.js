const express = require("express");
const dotenv = require("dotenv"); // setup environment variables
const morgan = require("morgan"); // setup requests logger middleware

dotenv.config({ path: "config.env" });

// Express App
const app = express();

// Middleware
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
