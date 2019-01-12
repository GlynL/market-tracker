import React, { useEffect, useState } from "react";
import Form from "./Form";
import { API_KEY } from "../variables";

// top coins https://coinmarketcap.com/all/views/all/

const Coins = ({ coins }) => {
  //  add chart js

  return coins.map(coin => (
    <li key={coin.name}>
      {coin.name}
      {coin.rate}
      {coin.to}
    </li>
  ));
};

const App = () => {
  const topCoins = ["btc" /* , "xrp", "eth", "bch", "eos" */];
  const [errorMessage, setErrorMessage] = useState(null);
  const [coins, setCoins] = useState([]);

  async function fetchValues(coins) {
    try {
      const promises = coins.map(coin =>
        fetch(
          `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${coin}&to_currency=USD&apikey=${API_KEY}`
        )
      );
      const responses = await Promise.all(promises);
      const preJSON = responses.map(response => response.json());
      const data = await Promise.all(preJSON);
      return data;
    } catch (err) {
      console.log("err");
      setErrorMessage("Error fetching data. Please try again.");
    }
  }

  useEffect(() => {
    fetchValues(topCoins).then(data => {
      const coins = data.map(coin => {
        const { ["Realtime Currency Exchange Rate"]: values } = coin;
        return {
          name: values["1. From_Currency Code"],
          to: values["3. To_Currency Code"],
          rate: values["5. Exchange Rate"]
        };
      });
      setCoins(coins);
    });
  }, []);

  const onSubmit = () => {
    // api call
  };

  return (
    <div>
      <h1>Market Tracker</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <Form onSubmit={onSubmit} />
      <Coins coins={coins} />
    </div>
  );
};

export default App;
