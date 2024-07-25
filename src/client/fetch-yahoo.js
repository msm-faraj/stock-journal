const axios = require("axios");

class YahooFinance {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async getStockData(ticker) {
    try {
      const response = await axios.get(this.baseURL, {
        params: {
          symbols: ticker,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching stock data:", error);
      throw error;
    }
  }
}

module.exports = YahooFinance;
