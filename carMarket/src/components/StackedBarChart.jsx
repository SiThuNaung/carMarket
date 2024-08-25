import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const colors = [
	'#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FFCD56', '#4BC0C0'
];

const StackedBarChart = ({ data }) => {
	// Step 1: Organize data by brand and model count
	const brandData = {};
	data.forEach(car => {
		const brand = car.NameMMT.split(' ')[0];
		const model = car.Model;
		if (!brandData[brand]) {
			brandData[brand] = {};
		}
		if (!brandData[brand][model]) {
			brandData[brand][model] = 0;
		}
		brandData[brand][model]++;
	});

	// Step 2: Prepare data for Chart.js
	const labels = Object.keys(brandData);
	const datasets = [];

	const modelSet = new Set();
	labels.forEach(brand => {
		Object.keys(brandData[brand]).forEach(model => {
			modelSet.add(model);
		});
	});

	const models = Array.from(modelSet);
	models.forEach((model, index) => {
		datasets.push({
			label: model,
			data: labels.map(brand => brandData[brand][model] || 0),
			backgroundColor: colors[index % colors.length]
		});
	});

	const chartData = {
		labels: labels,
		datasets: datasets
	};

	const options = {
        scales: {
            x: { stacked: true },
            y: { stacked: true }
        },
        plugins: {
            legend: {
                display: false // Disable the legend
            }
        }
    };
    
    return <Bar data={chartData} options={options} />;
};

export default StackedBarChart;