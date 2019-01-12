import React from "react";
import { Bar } from "react-chartjs-2";

const Chart = ({ coins }) => {
  //  add chart js
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
      height={200}
      options={{
        maintainAspectRatio: false
      }}
    />
  );
};

export default Chart;
