const mongoose = require("mongoose"); // setup mongoDB connection

const DBConnection = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then((conn) => {
      console.log(`DB connected: ${conn.connection.host}`);
    })
    .catch((err) => {
      console.log(`DB Error: ${err}`);
      process.exit(1);
    });
};

module.exports = DBConnection;
