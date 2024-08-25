import React from 'react';
import CarTable from './CarTable';
import PieChart from './PieChart';
import StackedBarChart from './StackedBarChart';
import data from '../data/taladrod-cars.json';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    
	return (
		<div className="dashboard">
			<nav>
				<Link to="/">Dashboard</Link>
				<Link to="/highlighted">Highlighted Cars</Link>
			</nav>
            <h1>Available Car Models in our Market</h1>
			<div className="stackChart">
				<StackedBarChart data={data.Cars} />
			</div>
			<h1>Dashboard</h1>
			<div className="dashboard-content">
				<CarTable data={data.Cars} />
				<div className="piechart">
					<PieChart data={data.Cars} />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;