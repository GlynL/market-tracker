import React, { useEffect, useState } from "react";
import Form from "./Form";
import { API_KEY } from "../variables";
import { Bar } from "react-chartjs-2";

// top coins https://coinmarketcap.com/all/views/all/

const Coins = ({ coins }) => {
  //  add chart js
  console.log(coins);
  if (coins.length === 0) return <div>loading...</div>;
  return (
    <Bar
      // width={100}
      // height={300}
      data={{
        labels: coins.map(coin => coin.name),
        datasets: [
          {
            label: "Current Value (USD)",
            data: coins.map(coin => coin.rate),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)"
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      }}
    />
  );

  return coins.map(coin => (
    <li key={coin.name}>
      {coin.name}
      {coin.rate}
      {coin.to}
    </li>
  ));
};
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
    // console.log(coins);
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
      <Coins coins={coins} />
    </div>
  );
};

export default App;
