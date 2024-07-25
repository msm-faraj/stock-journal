const axios = require("axios");

class AlphaFinance {
  constructor({ baseURL, apiKey }) {
    this.baseURL = baseURL;
    this.apiKey = apiKey;
  }

  async getStockData(ticker) {
    try {
      const TIME_SERIES_INTRADAY = "TIME_SERIES_INTRADAY";
      const intervalTime = "1min";

      const response = await axios.get(this.baseURL, {
        params: {
          function: TIME_SERIES_INTRADAY,
          symbol: ticker,
          interval: intervalTime,
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
