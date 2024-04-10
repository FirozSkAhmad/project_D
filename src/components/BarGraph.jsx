import React from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

// Chart options
const options = {
  plugins: {
    legend: {
      display: false, // This will hide the legend
    },
    tooltip: {
      enabled: true, // This will enable tooltips
    },
    datalabels: {
      display: true, // This will enable data labels
      color: "black",
      anchor: "end",
      align: "top",
      formatter: (value) => {
        return value.toLocaleString(); // This will format numbers with commas
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grace: '10%',
      ticks: {
        callback: (value) => value.toLocaleString(), // This will format y-axis ticks with commas
      },
    },
  },
  responsive: true,
  maintainAspectRatio: false,
};

const BarGraph = ({ data }) => {
  return (
    <div style={{ paddingBottom: "40px", height: "100%" }}>
      {" "}
      {/* Add this wrapper div */}
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarGraph;
