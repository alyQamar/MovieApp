const http = require("http");
const app = require("./app");
const dotenv = require("dotenv"); // setup environment variables
const morgan = require("morgan"); // setup requests logger middleware
const dbConnection = require("./config/database");

const server = http.createServer(app);

dotenv.config({ path: "config.env" });

// DB Connection
dbConnection();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

const PORT = process.env.PORT || 9000;
server.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
