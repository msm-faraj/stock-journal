const axios = require("axios");

class YahooFinance {
  constructor() {
    this.baseURL = "https://query1.finance.yahoo.com/v7/finance/quote";
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
