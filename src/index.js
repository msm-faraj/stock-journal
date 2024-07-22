const express = require("express");
const process = require("process");
const env = process.env.NODE_ENV || "development";
const { Sequelize, DataTypes } = require("sequelize");
const sequelizeConfig = require("./sequelize-config.json")[env];

const app = express();
const port = 3000;

const sequelize = new Sequelize(
  sequelizeConfig.database,
  sequelizeConfig.username,
  sequelizeConfig.password,
  sequelizeConfig
);
const Models = require("./models")(sequelize, DataTypes);

// Test the database connection
Models.User.sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

app.get("/", async (req, res) => {
  res.send("Hello World...!");
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});

module.exports = { sequelize };
