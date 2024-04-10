import React from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

// Updated data without the 'Daily Clicks' label

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false, // Hide legend
    },
    tooltip: {
      enabled: true, // Enable tooltips
    },
  },
  scales: {
    y: {
      beginAtZero: true, // Start the y-axis at 0
      grace: '10%',
      ticks: {
        // Include a comma as a thousands separator
        callback: function (value) {
          return value.toLocaleString();
        },
      },
    },
  },
};

const LineGraph = ({ data }) => {
  // Then return the line chart with your data and options
  return (
    <div style={{ paddingBottom: "40px", height: "100%" }}>
      {" "}
      {/* Add this wrapper div */}
      <Line data={data} options={options} />
    </div>
  );
};

export default LineGraph;
