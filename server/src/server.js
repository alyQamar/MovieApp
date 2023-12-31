const http = require("http");
const dotenv = require("dotenv"); // setup environment variables
const morgan = require("morgan"); // setup requests logger middleware
const cors = require("cors");
const compression = require("compression");
const app = require("./middlewares/app");
const dbConnection = require("./config/database");

const server = http.createServer(app);

app.use(cors);
app.options("*", cors());
app.use(compression);

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

// Handle rejections outside app (Express)
process.on("unhandledRejection", (err) => {
  console.error(`UnhandledRejection Error: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Server shutting down...`);
  });
});
