const express = require("express");

// Express App
const app = express();

const PORT = 9000;
app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
