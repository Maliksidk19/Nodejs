require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3500;
const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URI);

const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB Successfully !!");
  } catch (err) {
    console.error("Error Conneting to Database", err);
  } finally {
    await client.close();
  }
};

connectToDatabase();

app.listen(PORT, () => {
  console.log(`Server listening on "http://localhost:${PORT}"`);
});
