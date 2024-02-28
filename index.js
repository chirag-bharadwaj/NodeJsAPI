const express = require("express");
const app = express();
const mongoose = require("mongoose");
const routes = require("./Services");
const bodyParser = require("body-parser");
const user = require("./Models/user");
const PORT = 5000;
require("dotenv").config();
mongoose
  .connect(process.env.dbURL, { useNewUrlParser: true })
  .then(() => {
    console.log("DB Connected...");
  })
  .catch((err) => {
    console.log("Error", err);
  });

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", routes);

app.listen(PORT, () => {
  console.log("Connected");
});

module.exports = app;
