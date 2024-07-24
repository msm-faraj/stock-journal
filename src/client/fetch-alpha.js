const axios = require("axios");

class AlphaFinance {
  constructor({ baseURL, apiKey }) {
    this.baseURL = baseURL;
    this.apiKey = apiKey;
  }

  async getStockData(ticker) {
    try {
      const response = await axios.get(this.baseURL, {
        params: {
          function: "TIME_SERIES_INTRADAY",
          symbol: ticker,
          interval: "1min",
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
