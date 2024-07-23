const axios = require("axios");

class AlphaFinance {
  constructor() {
    this.baseURL = "https://www.alphavantage.co/query";
    this.apiKey = "YOUR_ALPHA_VANTAGE_API_KEY"; // Replace with your Alpha Vantage API key
  }

  async getStockData(ticker) {
    try {
      const response = await axios.get(this.baseURL, {
        params: {
          function: "TIME_SERIES_INTRADAY", // Choose appropriate function
          symbol: ticker,
          interval: "1min", // Interval of the time series data
          apikey: this.apiKey,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching stock data:", error);
      throw error;
    }
  }
}
module.exports = AlphaFinance;
