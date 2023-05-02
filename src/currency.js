export default class CurrencyExchange {
  static async getExchange (foreignCurrency) {
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/USD/${foreignCurrency}`);

      const jsonifiedResponse = await response.json();
      if (!response.ok) {
        if (jsonifiedResponse.result === "error") {
          return jsonifiedResponse;
        }
        const errorMessage = `${response.status} ${response.statusText} 
        ${jsonifiedResponse.message}`;
        throw new Error(errorMessage);
      } 
      return jsonifiedResponse;
    } catch(error) {
      return error;
    }
  }
}