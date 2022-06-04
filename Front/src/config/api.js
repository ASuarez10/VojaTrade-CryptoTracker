//Fetch the information about all cryptos from the API. Recieves the currency that we are using.
export const CoinList = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

//Fetch the information about a single crypto from the API. Recieves the id of the crypto.
export const SingleCoin = (id) =>
  `https://api.coingecko.com/api/v3/coins/${id}`;

//Fetch the information about a single crypto in the time. Recieves the id of the cypto, days and currency.
export const HistoricalChart = (id, days = 365, currency) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

//Fetch the information about the trending cryptos in the market to use in the carousel.
export const TrendingCoins = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;