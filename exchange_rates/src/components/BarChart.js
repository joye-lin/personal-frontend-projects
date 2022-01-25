import React from "react";
import { Chart } from "react-google-charts";
import millify from "millify";

export default function BarChart(props) {

  const data = [["Exchange Name", "Real-Time Value"]];

  function expo(x, f) {
    return Number.parseFloat(x).toExponential(f);
  }

  for (const [key, value] of Object.entries(props.data)) {
      data.push([value.name + ", " + value.unit, value.value]);
  }

  data.sort((a, b) => b[1] - a[1]);

  const options = {
    title: props.title,
    chartArea: { width: "50%" },
    isStacked: true,
    hAxis: {
      title: "Exchange Rate Value",
      minValue: 0,
    },
    vAxis: {
      title: "Exchange Name",
    },
  };
  
  return (
    <div style={{ marginTop: '10px', marginBottom: '40px'}}>
      <Chart
        chartType="BarChart"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    </div>
  );
}
