import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  const brandCount = data.reduce((acc, car) => {
	const brand = car.NameMMT.split(' ')[0];
	acc[brand] = (acc[brand] || 0) + 1;
	return acc;
  }, {});

  const chartData = {
	labels: Object.keys(brandCount),
	datasets: [{
	  data: Object.values(brandCount),
	  backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40']
	}]
  };

  return <Pie data={chartData} />;
};

export default PieChart;