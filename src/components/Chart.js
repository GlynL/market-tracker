import React from "react";
import { Line } from "react-chartjs-2";

const Chart = ({ coins }) => {
  if (coins.length === 0) return <div>loading...</div>;

  let fondledCoins = coins.map(coin => {
    const {
      "Time Series (Digital Currency Monthly)": data,
      "Meta Data": meta
    } = coin;
    return {
      data,
      meta
    };
  });

  // extract date & value from data - reverse order (oldest -> newest)
  fondledCoins.forEach(coin => {
    const fondledData = Object.entries(coin.data)
      .reverse()
      .map(day => {
        return {
          day: day[0],
          close: day[1]["4a. close (USD)"]
        };
      });
    coin.data = fondledData;
  });

  const labels = fondledCoins[0].data.map(day => day.day);
  const datasets = fondledCoins.map(coin => ({
    label: coin.meta["3. Digital Currency Name"],
    data: coin.data.map(day => day.close),
    fill: false
  }));

  return (
    <Line
      data={{
        labels,
        datasets
      }}
      options={{
        title: { display: true, text: "Daily Cryptocurrency Prices" },
        tooltips: {
          mode: "label"
        },
        scales: {
          xAxes: [
            {
              scaleLabel: { display: true, labelString: "Date" }
            }
          ],
          yAxes: [
            {
              scaleLabel: { display: true, labelString: "Closing Value (USD)" }
            }
          ]
        }
      }}
    />
  );
};

export default Chart;
