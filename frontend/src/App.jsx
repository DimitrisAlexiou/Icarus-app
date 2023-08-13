import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard, LandingPage, NotFound } from './pages/index';
import {
	UnAuthorized,
	Forbidden,
	Register,
	Login,
	ForgotPassword,
	ContactAdmin,
} from './pages/auth/index';
import {
	Courses,
	Studies,
	Undergraduate,
	Msc,
	Phd,
	Course,
	NewCourse,
	Teaching,
	MyCourses,
	GradeCourse,
	AssignTeachingInstructor,
	TeachingGrading,
} from './pages/course/index';
import { Reviews, TeachingReview, InstructorReview, GeneralReview } from './pages/review/index';
import {
	Configuration,
	AdminDashboard,
	Users,
	Instructors,
	Students,
	Teachings,
} from './pages/admin/index';
import {
	Portfolio,
	Profile,
	Messages,
	Statements,
	DegreeCompletion,
	StatisticsReports,
} from './pages/user/index';
import Notes from './pages/note/Notes';
import Calendar from './components/calendar/calendar';
import SharedLayout from './components/boilerplate/SharedLayout';
import ProtectedRoute from './components/boilerplate/ProtectedRoute';
import { ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
import { UserType } from './constants/enums';

export default function App() {
	const [theme, colorMode] = useMode();

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
							<Route path="/auth/contact-admin" element={<ContactAdmin />} />
							<Route path="/forbidden" element={<Forbidden />} />
							<Route path="/studies" element={<Studies />} />
							<Route path="*" element={<NotFound />} />
							{/* <Route path="/" element={user ? <SharedLayout /> : <LandingPage />}> */}
							<Route path="/" element={<SharedLayout />}>
								<Route index element={<Dashboard />} />
								<Route
									path="/admin/configuration"
									element={
										<ProtectedRoute allowedRoles={[UserType.admin]}>
											<Configuration />
										</ProtectedRoute>
									}
								/>
								<Route
									path="/admin/dashboard"
									element={
										<ProtectedRoute allowedRoles={[UserType.admin]}>
											<AdminDashboard />
										</ProtectedRoute>
									}
								/>
								<Route
									path="/users"
									element={
										<ProtectedRoute allowedRoles={[UserType.admin]}>
											<Users />
										</ProtectedRoute>
									}
								/>
								<Route
									path="/instructors"
									element={
										<ProtectedRoute allowedRoles={[UserType.admin]}>
											<Instructors />
										</ProtectedRoute>
									}
								/>
								<Route
									path="/students"
									element={
										<ProtectedRoute allowedRoles={[UserType.admin]}>
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
									path="/teachings"
									element={
										<ProtectedRoute
											allowedRoles={[UserType.admin, UserType.instructor]}
										>
											<Teachings />
										</ProtectedRoute>
									}
								/>
								<Route
									path="/teaching/:teachingId"
									element={
										<ProtectedRoute
											allowedRoles={[UserType.admin, UserType.instructor]}
										>
											<Teaching />
										</ProtectedRoute>
									}
								/>
								<Route
									path="/teaching/assign"
									element={
										<ProtectedRoute allowedRoles={[UserType.admin]}>
											<AssignTeachingInstructor />
										</ProtectedRoute>
									}
								/>
								<Route
									path="/teaching/grading"
									element={
										<ProtectedRoute
											allowedRoles={[UserType.admin, UserType.instructor]}
										>
											<TeachingGrading />
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
									path="/my-courses"
									element={
										<ProtectedRoute>
											<MyCourses />
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
										<ProtectedRoute allowedRoles={[UserType.admin]}>
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
								{/* <Route
									path="/course/:courseId/teaching"
									element={
										<ProtectedRoute
											allowedRoles={[UserType.admin, UserType.instructor]}
										>
											<Teaching />
										</ProtectedRoute>
									}
								/> */}
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
										<ProtectedRoute
											allowedRoles={[UserType.admin, UserType.student]}
										>
											<TeachingReview />
										</ProtectedRoute>
									}
								/>
								<Route
									path="/review/instructor"
									element={
										<ProtectedRoute
											allowedRoles={[UserType.admin, UserType.student]}
										>
											<InstructorReview />
										</ProtectedRoute>
									}
								/>
								<Route
									path="/review/general"
									element={
										<ProtectedRoute
											allowedRoles={[UserType.admin, UserType.student]}
										>
											<GeneralReview />
										</ProtectedRoute>
									}
								/>
								<Route
									path="/messages"
									element={
										<ProtectedRoute>
											<Messages />
										</ProtectedRoute>
									}
								/>
								<Route
									path="/statements"
									element={
										<ProtectedRoute>
											<Statements />
										</ProtectedRoute>
									}
								/>
								<Route
									path="/degree-completion"
									element={
										<ProtectedRoute>
											<DegreeCompletion />
										</ProtectedRoute>
									}
								/>
								<Route
									path="/statistics-reports"
									element={
										<ProtectedRoute>
											<StatisticsReports />
										</ProtectedRoute>
									}
								/>
								<Route
									path="/grade-course"
									element={
										<ProtectedRoute>
											<GradeCourse />
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
								<Route path="/unauthorized" element={<UnAuthorized />} />
							</Route>
						</Routes>
					</Router>
				</ThemeProvider>
			</ColorModeContext.Provider>
		</>
	);
}
