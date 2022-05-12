import {
	BrowserRouter as Router,
	Routes,
	Route,
	Outlet,
} from 'react-router-dom';
import { Container } from 'reactstrap';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import Reviews from './pages/Reviews';
import TeachingReviews from './pages/TeachingReviews';
import InstructorReviews from './pages/InstructorReviews';
import GeneralReviews from './pages/GeneralReviews';
import { useAuth0 } from '@auth0/auth0-react';
import './App.css';

// const Home = () => {
// 	<div className="wrapper">
// 		<Navbar />
// 		<div id="content-wrapper" className="d-flex flex-column">
// 			<div id="content">
// 				<Sidebar />
// 			</div>
// 			<Footer />
// 		</div>
// 	</div>;
// };

// export default function App() {
// 	return (
// 		<>
// 			<Router>
// 				<div className="wrapper">
// 					<Navbar />
// 					{/* <Sidebar /> */}
// 					<div id="content-wrapper" className="d-flex flex-column">
// 						<div id="content">
// 							<Sidebar />
// 						</div>
// 						<Routes>
// 							<Route path="/dashboard" element={<Dashboard />} />
// 							<Route path="/register" element={<Register />} />
// 							<Route path="/login" element={<Login />} />
// 							<Route path="/reviews" element={<Reviews />} />
// 						</Routes>
// 						{/* <Footer /> */}
// 					</div>
// 				</div>
// 			</Router>
// 		</>
// 	);
// }

export default function App() {
	return (
		<>
			<Router>
				<div className="pageWrapper d-flex wrapper">
					<aside className="sidebarArea shadow" id="sidebarArea">
						<Sidebar />
					</aside>

					<div className="contentArea">
						<Navbar />
						<Container fluid>
							<Outlet />
							<Routes>
								<Route path="/dashboard" element={<Dashboard />} />
								<Route path="/register" element={<Register />} />
								<Route path="/login" element={<Login />} />
								<Route path="/review" element={<Reviews />} />
								<Route path="/review/teaching" element={<TeachingReviews />} />
								<Route
									path="/review/instructor"
									element={<InstructorReviews />}
								/>
								<Route path="/review/general" element={<GeneralReviews />} />
							</Routes>
						</Container>
					</div>
				</div>
				{/* <Footer /> */}
			</Router>
		</>
	);
}

// export default function App() {
// 	return (
// 		<>
// 			<Router>
// 				<Routes>
// 					<Route path="/" element={<Home />} />
// 					<Route path="/dashboard" element={<Dashboard />} />
// 					<Route path="/register" element={<Register />} />
// 					<Route path="/login" element={<Login />} />
// 				</Routes>
// 				<Footer />
// 			</Router>
// 		</>
// 	);
// }
