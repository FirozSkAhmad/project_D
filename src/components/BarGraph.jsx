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
      grace: "10%",
      ticks: {
        callback: (value) => value.toLocaleString(), // This will format y-axis ticks with commas
      },
    },
  },
  responsive: true,
  maintainAspectRatio: false,
};

const valueAboveBarPlugin = {
  id: "valueAboveBarPlugin",
  afterDatasetsDraw: function (chart, args, options) {
    const { ctx, data: chartData } = chart;
    const { datasets } = chartData;
    ctx.save();

    // Inside the afterDatasetsDraw function of the valueAboveBarPlugin
    datasets.forEach((dataset, i) => {
      const meta = chart.getDatasetMeta(i);
      meta.data.forEach((bar, index) => {
        const value = dataset.data[index];
        const position = bar.tooltipPosition();
        ctx.fillStyle = "rgb(0,0,0)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle"; // Adjust baseline to middle for better visibility
        const yPosition = position.y - 10;
        ctx.fillText(
          value.toLocaleString(),
          position.x,
          yPosition > 0 ? yPosition : position.y + 20
        );
      });
    });

    ctx.restore();
  },
};

// Register the plugin outside of the component
Chart.register(valueAboveBarPlugin);

const BarGraph = ({ data, backgroundColor, borderColor, option }) => {
  console.log(backgroundColor);
  if (option === "YT_advt_videos" || option === "FB_advt_video") {
    // Assume data has a structure similar to the provided sample data object
    const labelCount = data.labels.length;

    // Set the background color and border color according to the length of labels
    const newBackgroundColor = new Array(labelCount).fill(backgroundColor);
    const newBorderColor = new Array(labelCount).fill(borderColor);

    // Assign these new color arrays to the dataset(s)
    data.datasets = data.datasets.map((dataset) => ({
      ...dataset,
      backgroundColor: newBackgroundColor, // Apply the new background color array
      borderColor: newBorderColor, // Apply the new border color array
    }));
  }

  return (
    <div style={{ paddingBottom: "40px", height: "100%" }}>
      {" "}
      {/* Add this wrapper div */}
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarGraph;
