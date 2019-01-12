import React, { useEffect } from "react";
import Form from "./Form";
import { API_KEY } from "../variables";

// top coins https://coinmarketcap.com/all/views/all/

const App = () => {
  async function fetchValue() {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=USD&apikey=${API_KEY}`
    );
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    const data = fetchValue().then(data => console.log(data));
  });

  const onSubmit = () => {
    // api call
  };

  return (
    <div>
      <h1>Market Tracker</h1>
      <Form onSubmit={onSubmit} />
      {/* add chart js */}
    </div>
  );
};

export default App;
