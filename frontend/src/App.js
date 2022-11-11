import {
	BrowserRouter as Router,
	Routes,
	Route,
	Outlet,
} from 'react-router-dom';
import { Container } from 'reactstrap';
import Navbar from './components/boilerplate/Navbar';
import Sidebar from './components/boilerplate/Sidebar';
import Footer from './components/boilerplate/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Courses from './pages/course/Courses';
import UndergraduateCourses from './pages/course/UndergraduateCourses';
import MasterCourses from './pages/course/MasterCourses';
import Course from './pages/course/Course';
import NewCourse from './pages/course/NewCourse';
import CoursePrerequisites from './pages/course/CoursePrerequisites';
import CourseEdit from './pages/course/CourseEdit';
import Reviews from './pages/review/Reviews';
import TeachingReview from './pages/review/TeachingReview';
import TeachingReviews from './pages/review/TeachingReviews';
import InstructorReview from './pages/review/InstructorReview';
import InstructorReviews from './pages/review/InstructorReviews';
import GeneralReview from './pages/review/GeneralReview';
import GeneralReviews from './pages/review/GeneralReviews';
import Profile from './pages/Profile';
import Users from './pages/admin/Users';
import Professors from './pages/admin/Professors';
import Students from './pages/admin/Students';
import Unauthorized from './pages/auth/UnAuthorized';
import Forbidden from './pages/auth/Forbidden';
import history from './utils/history';
import './App.css';

export default function App() {
	return (
		<>
			<Router history={history}>
				<div className="pageWrapper d-flex wrapper">
					<aside className="sidebarArea shadow">
						<Sidebar />
					</aside>

					<div className="contentArea">
						<Navbar />
						<Container fluid>
							<Outlet />
							<Routes>
								<Route index path="/" element={<Outlet />} />
								<Route element={<ProtectedRoute />}>
									<Route path="/profile" element={<Profile />} />
									<Route path="/course/:courseId" element={<Course />} />
									<Route
										path="/course/:courseId/edit"
										element={<CourseEdit />}
									/>
									{/* <Route path="/course/new" element={<NewCourse />} /> */}
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
									<Route path="/course" element={<Courses />} />
									<Route
										path="/course/undergraduate/all"
										element={<UndergraduateCourses />}
									/>
									<Route
										path="/course/master/all"
										element={<MasterCourses />}
									/>
								</Route>
								<Route
									path="/course/:courseId/prerequisites"
									element={<CoursePrerequisites />}
								/>
								<Route path="/course/new" element={<NewCourse />} />
								<Route path="/review" element={<Reviews />} />
								<Route path="/users" element={<Users />} />
								<Route path="/professors" element={<Professors />} />
								<Route path="/students" element={<Students />} />
								<Route path="/unauthorized" element={<Unauthorized />} />
								<Route path="/forbidden" element={<Forbidden />} />
							</Routes>
						</Container>
						<Footer />
					</div>
				</div>
			</Router>
		</>
	);
}
