const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const { User } = require("../db/models");

const app = express();
const port = 3000;

// Test the database connection
User.sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
