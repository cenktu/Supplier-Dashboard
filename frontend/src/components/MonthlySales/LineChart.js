import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const LineChart=({ monthlyTotals }) =>{
    const data={
        labels:Object.keys(monthlyTotals),
        datasets:[
            {
                label:'Monthly Sales',
                data: Object.values(monthlyTotals),
                fill: true,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0,
            },
        ],
    }
  return (
    <div>
         <h2>Monthly Sales Chart</h2>
        <Line data={data} />
    </div>
);
}

export default LineChart;