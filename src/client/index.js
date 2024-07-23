const AlphaFinance = require("./alpha.js");

// Example usage
const testYahooFinance = async (stockName) => {
  const finance = new AlphaFinance();
  try {
    const stockData = await finance.getStockData(stockName); // Test with a ticker symbol
    console.log("Stock Data:", stockData);
  } catch (error) {
    console.error("Error:", error);
  }
};

testYahooFinance("AAPL");
