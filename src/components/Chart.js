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

  const datasets = fondledCoins.map((coin, i) => {
    // Convert daily closing value to growth from previous day - day.close
    const data = coin.data.map((day, i) => {
      if (i === 0) return 0;
      const change = getChange(day.close, coin.data[i - 1].close);
      return change;
    });

    function getChange(latest, old) {
      return ((latest - old) / old) * 100;
    }

    function getRandomColor() {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    const borderColor = getRandomColor();

    return {
      label: coin.meta["3. Digital Currency Name"],
      data,
      fill: false,
      borderColor
    };
  });

  return (
    <Line
      data={{
        labels,
        datasets
      }}
      options={{
        title: { display: true, text: "Monthly Cryptocurrency Price Change" },
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
              scaleLabel: { display: true, labelString: "Change (%)" }
            }
          ]
        }
      }}
    />
  );
};

export default Chart;
