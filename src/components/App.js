import React, { useEffect, useState } from "react";
import Form from "./Form";
import Chart from "./Chart";
import { API_KEY } from "../variables";

// top coins https://coinmarketcap.com/all/views/all/

const App = () => {
  const topCoins = ["xrp", "eth", "bch", "eos"];
  const [errorMessage, setErrorMessage] = useState(null);
  const [coins, setCoins] = useState([]);

  async function fetchValues(coins) {
    try {
      const promises = coins.map(coin =>
        fetch(
          `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_MONTHLY&symbol=${coin}&market=USD&apikey=${API_KEY}`
        )
      );
      const responses = await Promise.all(promises);
      const preJSON = responses.map(response => response.json());
      const data = await Promise.all(preJSON);
      data.forEach(coin => {
        if (coin.Note)
          throw new Error(
            "Currently over API limit. Please wait a minute and refresh."
          );
      });
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  useEffect(() => {
    fetchValues(topCoins)
      .then(data => setCoins(data))
      .catch(err => setErrorMessage(err.message));
  }, []);

  const onSubmit = () => {
    // api call
  };

  return (
    <div>
      <h1>Market Tracker</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <Form onSubmit={onSubmit} />
      <Chart coins={coins} />
    </div>
  );
};

export default App;
