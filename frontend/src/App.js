import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import Reviews from './pages/Reviews';
import '../src/App.css';

// import '../src/index.css';
// import '../src/index2.css';
// import '../src/index3.scss';

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

export default function App() {
	return (
		<>
			<Router>
				{/* <div className="wrapper"> */}
				<Navbar />
				<Sidebar />
				{/* <div id="content-wrapper" className="d-flex flex-column"> */}
				{/* <div id="content"><Sidebar /></div> */}
				<Routes>
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/reviews" element={<Reviews />} />
				</Routes>
				{/* <Footer /> */}
				{/* </div> */}
				{/* </div> */}
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
