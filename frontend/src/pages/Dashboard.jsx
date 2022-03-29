import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

class Dashboard extends Component {
	render() {
		return (
			<>
				<Navbar />
				<Sidebar />
				<Footer />
			</>
		);
	}
}
// function Dashboard() {
// 	return (
// 		<div>
// 			<h1>Dashboard</h1>
// 		</div>
// 	);
// }

export default Dashboard;
