import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard, LandingPage, NotFound } from './pages/index';
import SharedLayout from './components/boilerplate/SharedLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Unauthorized from './pages/auth/UnAuthorized';
import Forbidden from './pages/auth/Forbidden';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import Courses from './pages/course/Courses';
import Undergraduate from './pages/course/Undergraduate';
import Msc from './pages/course/Msc';
import Phd from './pages/course/Phd';
import Course from './pages/course/Course';
import NewCourse from './pages/course/NewCourse';
import CourseEdit from './pages/course/CourseEdit';
import Teaching from './pages/course/Teaching';
import Reviews from './pages/review/Reviews';
import TeachingReview from './pages/review/TeachingReview';
import InstructorReview from './pages/review/InstructorReview';
import GeneralReview from './pages/review/GeneralReview';
import TeachingReviews from './pages/review/TeachingReviews';
import InstructorReviews from './pages/review/InstructorReviews';
import GeneralReviews from './pages/review/GeneralReviews';
import Portfolio from './pages/user/Portfolio';
import Profile from './pages/user/Profile';
import Notes from './pages/note/Notes';
import Calendar from './components/calendar/calendar';
import Configuration from './pages/admin/Configuration';
import AdminDashboard from './pages/admin/AdminDashboard';
import Users from './pages/admin/Users';
import Professors from './pages/admin/Professors';
import Students from './pages/admin/Students';
import { checkTokenExpiration } from './utils/checkTokenExpiration';
import { addLastPageToLocalStorage } from './utils/redux/localStorage';
import { ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';

export default function App() {
	const [theme, colorMode] = useMode();
	// const [lastPage, setLastPage] = useState(localStorage.getItem('lastPage'));
	// const location = useLocation();

	useEffect(() => {
		const interval = setInterval(() => {
			console.log('EXECUTING EVERY 15 MINUTES');
			checkTokenExpiration();
		}, 10 * 60 * 1000);
		addLastPageToLocalStorage();
		return () => clearInterval(interval);
	}, []);

	// useEffect(() => {
	// 	localStorage.setItem('lastPage', location.pathname);
	// }, [location]);

	// useEffect(() => {
	// 	const storageListener = () => {
	// 		setLastPage(localStorage.getItem('lastPage'));
	// 	};
	// 	window.addEventListener('storage', storageListener);
	// 	return () => {
	// 		window.removeEventListener('storage', storageListener);
	// 	};
	// }, []);

	return (
		<>
			<ColorModeContext.Provider value={colorMode}>
				<ThemeProvider theme={theme}>
					<Router>
						<Routes>
							<Route path="/landing" element={<LandingPage />} />
							<Route path="/auth/register" element={<Register />} />
							<Route path="/auth/login" element={<Login />} />
							<Route path="/auth/forgot-password" element={<ForgotPassword />} />
							<Route path="/forbidden" element={<Forbidden />} />
							<Route path="*" element={<NotFound />} />
							<Route path="/" element={<SharedLayout />}>
								<Route index element={<Dashboard />} />
								<Route
									path="/admin/configuration"
									element={
										<ProtectedRoute allowedRoles={['Admin']}>
											<Configuration />
										</ProtectedRoute>
									}
								/>
								<Route
									path="/admin/dashboard"
									element={
										<ProtectedRoute allowedRoles={['Admin']}>
											<AdminDashboard />
										</ProtectedRoute>
									}
								/>
								<Route
									path="/users"
									element={
										<ProtectedRoute allowedRoles={['Admin']}>
											<Users />
										</ProtectedRoute>
									}
								/>
								<Route
									path="/professors"
									element={
										<ProtectedRoute allowedRoles={['Admin']}>
											<Professors />
										</ProtectedRoute>
									}
								/>
								<Route
									path="/students"
									element={
										<ProtectedRoute allowedRoles={['Admin']}>
											<Students />
										</ProtectedRoute>
									}
								/>
								<Route
									path="/user/profile"
									element={
										<ProtectedRoute>
											<Profile />
										</ProtectedRoute>
									}
								/>
								<Route
									path="/course"
									element={
										<ProtectedRoute>
											<Courses />
										</ProtectedRoute>
									}
								/>
								<Route
									path="/course/undergraduate"
									element={
										<ProtectedRoute>
											<Undergraduate />
										</ProtectedRoute>
									}
								/>
								<Route
									path="/course/msc"
									element={
										<ProtectedRoute>
											<Msc />
										</ProtectedRoute>
									}
								/>
								<Route
									path="/course/phd"
									element={
										<ProtectedRoute>
											<Phd />
										</ProtectedRoute>
									}
								/>
								<Route
									path="/course/new"
									element={
										<ProtectedRoute allowedRoles={['Admin']}>
											<NewCourse />
										</ProtectedRoute>
									}
								/>
								<Route
									path="/course/:courseId"
									element={
										<ProtectedRoute>
											<Course />
										</ProtectedRoute>
									}
								/>
								<Route
									path="/course/:courseId/edit"
									element={
										<ProtectedRoute allowedRoles={['Admin', 'Instructor']}>
											<CourseEdit />
										</ProtectedRoute>
									}
								/>
								<Route
									path="/course/:courseId/teaching"
									element={
										<ProtectedRoute allowedRoles={['Admin', 'Instructor']}>
											<Teaching />
										</ProtectedRoute>
									}
								/>
								<Route
									path="/review"
									element={
										<ProtectedRoute>
											<Reviews />
										</ProtectedRoute>
									}
								/>
								<Route
									path="/review/teaching"
									element={
										<ProtectedRoute allowedRoles={['Admin', 'Student']}>
											<TeachingReview />
										</ProtectedRoute>
									}
								/>
								<Route
									path="/review/teaching/all"
									element={
										<ProtectedRoute>
											<TeachingReviews />
										</ProtectedRoute>
									}
								/>
								<Route
									path="/review/instructor"
									element={
										<ProtectedRoute allowedRoles={['Admin', 'Student']}>
											<InstructorReview />
										</ProtectedRoute>
									}
								/>
								<Route
									path="/review/instructor/all"
									element={
										<ProtectedRoute>
											<InstructorReviews />
										</ProtectedRoute>
									}
								/>
								<Route
									path="/review/general"
									element={
										<ProtectedRoute allowedRoles={['Admin', 'Student']}>
											<GeneralReview />
										</ProtectedRoute>
									}
								/>
								<Route
									path="/review/general/all"
									element={
										<ProtectedRoute>
											<GeneralReviews />
										</ProtectedRoute>
									}
								/>
								<Route
									path="/portfolio"
									element={
										<ProtectedRoute>
											<Portfolio />
										</ProtectedRoute>
									}
								/>
								<Route
									path="/note"
									element={
										<ProtectedRoute>
											<Notes />
										</ProtectedRoute>
									}
								/>
								<Route
									path="/calendar"
									element={
										<ProtectedRoute>
											<Calendar />
										</ProtectedRoute>
									}
								/>
								<Route path="/unauthorized" element={<Unauthorized />} />
							</Route>
						</Routes>
					</Router>
				</ThemeProvider>
			</ColorModeContext.Provider>
		</>
	);
}
