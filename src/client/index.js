const { alphaFinance, yahooFinance } = require("../config.js");

const searchWithAlpha = async (stockName) => {
  try {
    const stockData = await alphaFinance.getStockData(stockName);
    console.log("Stock Data Alpha: ", stockData);
  } catch (error) {
    console.error("Error:", error);
  }
};

const searchWithYahoo = async (stockName) => {
  try {
    const stockData = await yahooFinance.getStockData(stockName);
    console.log("Stock Data Yahoo: ", stockData);
  } catch (error) {
    console.error("Error: ", error);
  }
};

searchWithAlpha("AAPL");
searchWithYahoo("AAPL");
