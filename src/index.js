const express = require("express");
const process = require("process");
const env = process.env.NODE_ENV || "development";
const { Sequelize, DataTypes } = require("sequelize");
const sequelizeConfig = require("./sequelize-config.json")[env];
const AlphaFinance = require("./client/fetch-alpha");
const YahooFinance = require("./client/fetch-yahoo");

const app = express();
const port = 3000;

const sequelize = new Sequelize(
  sequelizeConfig.database,
  sequelizeConfig.username,
  sequelizeConfig.password,
  sequelizeConfig
);
const Models = require("./models")(sequelize, DataTypes);

const alphaBaseUrl = "https://www.alphavantage.co/query";
const alphaApiKey = "YOUR_ALPHA_VANTAGE_API_KEY";

const yahooBaseUrl = "https://query1.finance.yahoo.com/v7/finance/quote";

const alphaFinance = new AlphaFinance({
  baseURL: alphaBaseUrl,
  apiKey: alphaApiKey,
});
const yahooFinance = new YahooFinance(yahooBaseUrl);

// Test the database connection
Models.User.sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

app.get("/", async (req, res) => {
  res.send("Hello World...");
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});

module.exports = { sequelize, alphaFinance, yahooFinance };
