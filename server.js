const { ObjectID } = require("mongodb");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const { connectToDb, getDb } = require("./dbConnect");

const getUsers = require("./routes/getUsers");

app.use(bodyParser.json());

let db;

connectToDb((err) => {
  if (!err) {
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
    db = getDb();
  }
});

app.use("/users", getUsers);
