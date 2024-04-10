import React from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

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

const APBarGraph = ({ title, data, backgroundColor, borderColor }) => {
  const chartData = {
    labels: ["Planned", "Actual"],
    datasets: [
      {
        label: title,
        data: data,
        backgroundColor: [backgroundColor, backgroundColor],
        borderColor: [borderColor, borderColor],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grace: '10%',
        ticks: {
          callback: function (value) {
            return value.toLocaleString();
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ paddingBottom: '30px', height: '100%' }}> {/* Add this wrapper div */}
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default APBarGraph;
