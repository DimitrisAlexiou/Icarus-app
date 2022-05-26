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
import Login from './pages/Login';
import Course from './pages/Course';
import Courses from './pages/Courses';
import Reviews from './pages/Reviews';
import TeachingReview from './pages/TeachingReview';
import TeachingReviews from './pages/TeachingReviews';
import InstructorReview from './pages/InstructorReview';
import InstructorReviews from './pages/InstructorReviews';
import GeneralReview from './pages/GeneralReview';
import GeneralReviews from './pages/GeneralReviews';
import './App.css';

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
								<Route path="/login" element={<Login />} />
								<Route path="/course" element={<Courses />} />
								<Route path="/course/new" element={<Course />} />
								<Route path="/review" element={<Reviews />} />
								<Route path="/review/teaching" element={<TeachingReview />} />
								<Route
									path="/review/teaching/all"
									element={<TeachingReviews />}
								/>
								<Route
									path="/review/instructor"
									element={<InstructorReview />}
								/>
								<Route
									path="/review/instructor/all"
									element={<InstructorReviews />}
								/>
								<Route path="/review/general" element={<GeneralReview />} />
								<Route
									path="/review/general/all"
									element={<GeneralReviews />}
								/>
							</Routes>
						</Container>
					</div>
				</div>
				{/* <Footer /> */}
			</Router>
		</>
	);
}
