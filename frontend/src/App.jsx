import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { Dashboard, LandingPage, NotFound } from './pages/index';
import SharedLayout from './components/boilerplate/SharedLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Portfolio from './pages/user/Portfolio';
import Profile from './pages/user/Profile';
import Courses from './pages/course/Courses';
import Undergraduate from './pages/course/Undergraduate';
import Master from './pages/course/Master';
import Course from './pages/course/Course';
import NewCourse from './pages/course/NewCourse';
import CourseEdit from './pages/course/CourseEdit';
import Teaching from './pages/course/Teaching';
import Reviews from './pages/review/Reviews';
import TeachingReview from './pages/review/TeachingReview';
import TeachingReviews from './pages/review/TeachingReviews';
import InstructorReview from './pages/review/InstructorReview';
import InstructorReviews from './pages/review/InstructorReviews';
import GeneralReview from './pages/review/GeneralReview';
import GeneralReviews from './pages/review/GeneralReviews';
import AdminDashboard from './pages/admin/AdminDashboard';
import Users from './pages/admin/Users';
import Professors from './pages/admin/Professors';
import Students from './pages/admin/Students';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import Unauthorized from './pages/auth/UnAuthorized';
import Forbidden from './pages/auth/Forbidden';
import Configuration from './pages/admin/Configuration';
// import history from './utils/history';
import trackHistory from './utils/historyTracker.js';
import checkTokenExpiration from './utils/checkTokenExpiration';
import './App.css';
import Notes from './pages/note/Notes';

export default function App() {
	useEffect(() => {
		checkTokenExpiration();
		trackHistory();
	}, []);

	return (
		<>
			<Router>
				<Routes>
					<Route path="/landing" element={<LandingPage />} />
					<Route path="/auth/register" element={<Register />} />
					<Route path="/auth/login" element={<Login />} />
					<Route path="/auth/forgot-password" element={<ForgotPassword />} />
					<Route path="*" element={<NotFound />} />
					<Route path="/" element={<SharedLayout />}>
						<Route index element={<Dashboard />} />
						<Route
							path="/course/undergraduate"
							element={
								<ProtectedRoute>
									<Undergraduate />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/admin/configuration"
							element={
								<ProtectedRoute>
									<Configuration />
								</ProtectedRoute>
							}
						/>
						<Route path="/user/profile" element={<Profile />} />
						<Route path="/course/:courseId" element={<Course />} />
						<Route path="/course/:courseId/edit" element={<CourseEdit />} />
						{/* <Route path="/course/new" element={<NewCourse />} /> */}
						<Route path="/review/teaching" element={<TeachingReview />} />
						<Route path="/review/teaching/all" element={<TeachingReviews />} />
						<Route path="/review/instructor" element={<InstructorReview />} />
						<Route path="/review/instructor/all" element={<InstructorReviews />} />
						<Route path="/review/general" element={<GeneralReview />} />
						<Route path="/review/general/all" element={<GeneralReviews />} />
						{/* <Route path="/course" element={<Courses />} /> */}
						<Route path="/course/master" element={<Master />} />
						<Route path="/course" element={<Courses />} />
						<Route path="/portfolio" element={<Portfolio />} />
						<Route path="/course/new" element={<NewCourse />} />
						<Route path="/course/:courseId/teaching" element={<Teaching />} />
						<Route path="/review" element={<Reviews />} />
						<Route path="/note" element={<Notes />} />
						<Route path="/admin/dashboard" element={<AdminDashboard />} />
						<Route path="/users" element={<Users />} />
						<Route path="/professors" element={<Professors />} />
						<Route path="/students" element={<Students />} />
						<Route path="/unauthorized" element={<Unauthorized />} />
						<Route path="/forbidden" element={<Forbidden />} />
					</Route>
				</Routes>
			</Router>
		</>
	);
}
