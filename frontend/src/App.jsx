import { Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
import { UserType } from './constants/enums';
import { LandingPage, NotFound } from './pages/index';
import {
	UnAuthorized,
	Forbidden,
	Register,
	Login,
	ForgotPassword,
	ContactAdmin,
} from './pages/auth/index';
import { Phd, Course, Master } from './pages/course/index';
import { Teaching } from './pages/teaching/index';
import {
	TeachingReview,
	InstructorReview,
	GeneralReview,
} from './pages/review/index';
import { NewCourse, CreateStatement, CreateVaccine } from './pages/admin/index';
import {
	MyCourses,
	MyGrades,
	Portfolio,
	Profile,
	Messages,
	Statements,
	DegreeCompletion,
	Activity,
} from './pages/user/index';
import SharedLayout from './components/boilerplate/SharedLayout';
import ProtectedRoute from './components/boilerplate/ProtectedRoute';
import Spinner from './components/boilerplate/spinners/Spinner';

const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const Configuration = lazy(() => import('./pages/admin/Configuration'));
const Users = lazy(() => import('./pages/admin/users/Users'));
const Instructors = lazy(() => import('./pages/admin/users/Instructors'));
const Students = lazy(() => import('./pages/admin/users/Students'));
const Teachings = lazy(() => import('./pages/admin/Teachings'));
const AdminStatements = lazy(() =>
	import('./pages/admin/statement/AdminStatements')
);
const AdminAnnouncements = lazy(() =>
	import('./pages/admin/AdminAnnouncements')
);
const AdminCalendar = lazy(() => import('./components/admin/AdminCalendar'));

const Courses = lazy(() => import('./pages/course/Courses'));
const Studies = lazy(() => import('./pages/course/Studies'));
const Undergraduate = lazy(() => import('./pages/course/Undergraduate'));
const Msc = lazy(() => import('./pages/course/Msc'));

const AssignTeachingInstructor = lazy(() =>
	import('./pages/teaching/AssignTeachingInstructor')
);
const TeachingGrading = lazy(() => import('./pages/teaching/TeachingGrading'));

const Reviews = lazy(() => import('./pages/review/Reviews'));
const Notes = lazy(() => import('./pages/note/Notes'));
const Calendar = lazy(() => import('./components/calendar/Calendar'));
const StatisticsReports = lazy(() => import('./pages/user/StatisticsReports'));
const Announcements = lazy(() => import('./pages/user/Announcements'));

export default function App() {
	const [theme, colorMode] = useMode();
	const { user } = useSelector((state) => state.auth);

	return (
		<>
			<Suspense fallback={<Spinner />}>
				<ColorModeContext.Provider value={colorMode}>
					<ThemeProvider theme={theme}>
						<Router>
							<Routes>
								<Route path="/landing" element={<LandingPage />} />
								<Route path="/auth/register" element={<Register />} />
								<Route path="/auth/login" element={<Login />} />
								<Route
									path="/auth/forgot-password"
									element={<ForgotPassword />}
								/>
								<Route path="/auth/contact-admin" element={<ContactAdmin />} />
								<Route path="/forbidden" element={<Forbidden />} />
								<Route path="/unauthorized" element={<UnAuthorized />} />
								<Route path="/studies" element={<Studies user={user} />} />
								<Route
									path="/studies/undergraduate"
									element={<Undergraduate />}
								/>
								<Route path="/studies/msc" element={<Msc />} />
								<Route path="/studies/msc/master" element={<Master />} />
								<Route path="/studies/phd" element={<Phd />} />
								<Route path="*" element={<NotFound />} />
								<Route
									path="/"
									element={
										user ? <SharedLayout user={user} /> : <LandingPage />
									}
								>
									<Route index element={<Dashboard user={user} />} />
									<Route
										path="/admin/configuration"
										element={
											<ProtectedRoute
												user={user}
												allowedRoles={[UserType.admin]}
											>
												<Configuration />
											</ProtectedRoute>
										}
									/>
									<Route
										path="/admin/dashboard"
										element={
											<ProtectedRoute
												user={user}
												allowedRoles={[UserType.admin]}
											>
												<AdminDashboard />
											</ProtectedRoute>
										}
									/>
									<Route
										path="/admin/statements"
										element={
											<ProtectedRoute
												user={user}
												allowedRoles={[UserType.admin]}
											>
												<AdminStatements />
											</ProtectedRoute>
										}
									/>
									<Route
										path="/admin/announcements"
										element={
											<ProtectedRoute
												user={user}
												allowedRoles={[UserType.admin]}
											>
												<AdminAnnouncements user={user} />
											</ProtectedRoute>
										}
									/>
									<Route
										path="/admin/calendar"
										element={
											<ProtectedRoute
												user={user}
												allowedRoles={[UserType.admin]}
											>
												<AdminCalendar />
											</ProtectedRoute>
										}
									/>
									<Route
										path="/users"
										element={
											<ProtectedRoute
												user={user}
												allowedRoles={[UserType.admin]}
											>
												<Users />
											</ProtectedRoute>
										}
									/>
									<Route
										path="/instructors"
										element={
											<ProtectedRoute
												user={user}
												allowedRoles={[UserType.admin]}
											>
												<Instructors />
											</ProtectedRoute>
										}
									/>
									<Route
										path="/students"
										element={
											<ProtectedRoute
												user={user}
												allowedRoles={[UserType.admin]}
											>
												<Students />
											</ProtectedRoute>
										}
									/>
									<Route
										path="/user/profile"
										element={
											<ProtectedRoute user={user}>
												<Profile user={user} />
											</ProtectedRoute>
										}
									/>
									<Route
										path="/user/activity"
										element={
											<ProtectedRoute user={user}>
												<Activity />
											</ProtectedRoute>
										}
									/>
									<Route
										path="/teachings"
										element={
											<ProtectedRoute
												user={user}
												allowedRoles={[UserType.admin, UserType.instructor]}
											>
												<Teachings />
											</ProtectedRoute>
										}
									/>
									<Route
										path="/teaching/:teachingId"
										element={
											<ProtectedRoute user={user}>
												<Teaching user={user} />
											</ProtectedRoute>
										}
									/>
									<Route
										path="/teaching/assign"
										element={
											<ProtectedRoute
												user={user}
												allowedRoles={[UserType.admin]}
											>
												<AssignTeachingInstructor />
											</ProtectedRoute>
										}
									/>
									<Route
										path="/teaching/grading"
										element={
											<ProtectedRoute
												user={user}
												allowedRoles={[UserType.admin, UserType.instructor]}
											>
												<TeachingGrading />
											</ProtectedRoute>
										}
									/>
									<Route
										path="/course"
										element={
											<ProtectedRoute user={user}>
												<Courses />
											</ProtectedRoute>
										}
									/>
									<Route
										path="/my-courses"
										element={
											<ProtectedRoute user={user}>
												<MyCourses />
											</ProtectedRoute>
										}
									/>
									<Route
										path="/course/undergraduate"
										element={
											<ProtectedRoute user={user}>
												<Undergraduate user={user} />
											</ProtectedRoute>
										}
									/>
									<Route
										path="/course/msc"
										element={
											<ProtectedRoute user={user}>
												<Msc user={user} />
											</ProtectedRoute>
										}
									/>
									<Route
										path="/course/msc/:masterId"
										element={
											<ProtectedRoute user={user}>
												<Master user={user} />
											</ProtectedRoute>
										}
									/>
									<Route
										path="/course/phd"
										element={
											<ProtectedRoute user={user}>
												<Phd user={user} />
											</ProtectedRoute>
										}
									/>
									<Route
										path="/course/new"
										element={
											<ProtectedRoute
												user={user}
												allowedRoles={[UserType.admin]}
											>
												<NewCourse />
											</ProtectedRoute>
										}
									/>
									<Route
										path="/course/:courseId"
										element={
											<ProtectedRoute user={user}>
												<Course />
											</ProtectedRoute>
										}
									/>
									<Route
										path="/review"
										element={
											<ProtectedRoute user={user}>
												<Reviews />
											</ProtectedRoute>
										}
									/>
									<Route
										path="/review/teaching"
										element={
											<ProtectedRoute
												user={user}
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
												user={user}
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
												user={user}
												allowedRoles={[UserType.admin, UserType.student]}
											>
												<GeneralReview />
											</ProtectedRoute>
										}
									/>
									<Route
										path="/announcement"
										element={
											<ProtectedRoute
												user={user}
												allowedRoles={[UserType.admin, UserType.instructor]}
											>
												<Announcements />
											</ProtectedRoute>
										}
									/>
									<Route
										path="/messages"
										element={
											<ProtectedRoute user={user}>
												<Messages />
											</ProtectedRoute>
										}
									/>
									<Route
										path="/statements"
										element={
											<ProtectedRoute
												user={user}
												allowedRoles={[UserType.admin, UserType.student]}
											>
												<Statements />
											</ProtectedRoute>
										}
									/>
									<Route
										path="/statement/new"
										element={
											<ProtectedRoute
												user={user}
												allowedRoles={[UserType.admin]}
											>
												<CreateStatement />
											</ProtectedRoute>
										}
									/>
									<Route
										path="/vaccine/new"
										element={
											<ProtectedRoute
												user={user}
												allowedRoles={[UserType.admin]}
											>
												<CreateVaccine />
											</ProtectedRoute>
										}
									/>
									<Route
										path="/my-grades"
										element={
											<ProtectedRoute user={user}>
												<MyGrades user={user} />
											</ProtectedRoute>
										}
									/>
									<Route
										path="/degree-completion"
										element={
											<ProtectedRoute user={user}>
												<DegreeCompletion />
											</ProtectedRoute>
										}
									/>
									<Route
										path="/statistics-reports"
										element={
											<ProtectedRoute user={user}>
												<StatisticsReports />
											</ProtectedRoute>
										}
									/>
									<Route
										path="/teaching/:teachingId/portfolio"
										element={
											<ProtectedRoute user={user}>
												<Portfolio user={user} />
											</ProtectedRoute>
										}
									/>
									<Route
										path="/note"
										element={
											<ProtectedRoute user={user}>
												<Notes />
											</ProtectedRoute>
										}
									/>
									<Route
										path="/calendar"
										element={
											<ProtectedRoute user={user}>
												<Calendar />
											</ProtectedRoute>
										}
									/>
								</Route>
							</Routes>
						</Router>
					</ThemeProvider>
				</ColorModeContext.Provider>
			</Suspense>
		</>
	);
}
