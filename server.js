require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3500;
const mongoose = require("mongoose");

try {
  mongoose.connect(process.env.MONGO_URI);
  console.log("Connected successfully to Database...");
} catch (err) {
  console.error(err);
}

app.listen(PORT, () => {
  console.log(`Server listening on "http://localhost:${PORT}"`);
});
