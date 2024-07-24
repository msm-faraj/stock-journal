const AlphaFinance = require("./client/fetch-alpha");
const YahooFinance = require("./client/fetch-yahoo");

const alphaBaseUrl = "https://www.alphavantage.co/query";
const alphaApiKey = "YOUR_ALPHA_VANTAGE_API_KEY";

const yahooBaseUrl = "https://query1.finance.yahoo.com/v7/finance/quote";

const alphaFinance = new AlphaFinance({
  baseURL: alphaBaseUrl,
  apiKey: alphaApiKey,
});
const yahooFinance = new YahooFinance(yahooBaseUrl);

module.exports = { alphaFinance, yahooFinance };
