import React, { useEffect, useState } from "react";
import Form from "./Form";
import Chart from "./Chart";
import { API_KEY } from "../variables";

// top coins https://coinmarketcap.com/all/views/all/

const dummyCoins = [
  { name: "BTC", to: "USD", rate: "50.99000000" },
  { name: "XRP", to: "USD", rate: "0.33185418" },
  { name: "ETH", to: "USD", rate: "128.07000000" },
  { name: "BCH", to: "USD", rate: "135.93000000" },
  { name: "EOS", to: "USD", rate: "2.46000000" }
];

const App = () => {
  const topCoins = ["btc", "xrp", "eth", "bch", "eos"];
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
    // fetchValues(topCoins).then(data => {
    //   const coins = data.map(coin => {
    //     const { ["Realtime Currency Exchange Rate"]: values } = coin;
    //     return {
    //       name: values["1. From_Currency Code"],
    //       to: values["3. To_Currency Code"],
    //       rate: values["5. Exchange Rate"]
    //     };
    //   });
    setCoins(dummyCoins);
    // });
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
