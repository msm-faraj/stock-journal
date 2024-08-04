const express = require("express");
const process = require("process");
const config = require("./config");
const env = process.env.NODE_ENV || "development";
const { Sequelize, DataTypes } = require("sequelize");
const sequelizeConfig = require("./sequelize-config.json")[env];
const AlphaFinance = require("./clients/fetch-alpha");
const YahooFinance = require("./clients/fetch-yahoo");
const authRouter = require("./routes/authRouter");

const app = express();
const port = 3000;

const sequelize = new Sequelize(
  sequelizeConfig.database,
  sequelizeConfig.username,
  sequelizeConfig.password,
  sequelizeConfig
);
const Models = require("./models")(sequelize, DataTypes);

const alphaFinance = new AlphaFinance({
  baseURL: config.alpha.alphaBaseUrl,
  apiKey: config.alpha.alphaApiKey,
});
const yahooFinance = new YahooFinance(config.yahoo.yahooBaseUrl);

// Test the database connection
Models.User.sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

app.use(express.json());
app.use("/api/auth", authRouter(Models.User));

app.get("/", async (req, res) => {
  res.send("Hello World...");
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});

module.exports = { sequelize, alphaFinance, yahooFinance };
