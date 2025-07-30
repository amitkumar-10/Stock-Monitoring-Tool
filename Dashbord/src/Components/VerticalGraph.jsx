import React, { useRef } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from "chart.js";
import {
  Chart,
  getDatasetAtEvent,
  getElementAtEvent,
  getElementsAtEvent,
} from "react-chartjs-2";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

const options = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const VerticalGraph = ({ allHolding }) => {
  const chartRef = useRef(null);

  const labels = allHolding.map((item) => item.name);

  const data = {
    labels,
    datasets: [
      {
        type: "line",
        label: "Price (₹)",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 2,
        fill: false,
        data: allHolding.map((item) => item.price),
      },
      {
        type: "bar",
        label: "Quantity",
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "white",
        borderWidth: 2,
        data: allHolding.map((item) => item.avg),
      },
      {
        type: 'bar',
        label: 'Changes',
        backgroundColor: allHolding.map(item => {
        const value = parseFloat(item.net.replace('%', ''));
            return value < 0 ? '#FF2C2C' : '#5E936C'; // or use 'blue' instead of green if you like
        }),
        borderColor: 'white',
        borderWidth: 5,
        data: allHolding.map((item) => parseFloat(item.net.replace("%", ""))),

      },
    ],
  };

  const onClick = (event) => {
    const chart = chartRef.current;
    if (!chart) return;

    const dataset = getDatasetAtEvent(chart, event);
    const element = getElementAtEvent(chart, event);

    if (dataset.length) {
      console.log("Dataset clicked:", data.datasets[dataset[0].datasetIndex].label);
    }

    if (element.length) {
      const { datasetIndex, index } = element[0];
      console.log(
        "Element clicked:",
        data.labels[index],
        data.datasets[datasetIndex].data[index]
      );
    }
  };

  return (
    <div>
      {allHolding.length > 0 ? (
        <Chart
          ref={chartRef}
          type="bar"
          data={data}
          options={options}
          onClick={onClick}
        />
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
};

export default VerticalGraph;
