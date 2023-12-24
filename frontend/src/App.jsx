import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage, NotFound } from './pages/index';
import { Dashboard } from './pages/dashboard/index';
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
	Master,
} from './pages/course/index';
import {
	Teaching,
	AssignTeachingInstructor,
	TeachingGrading,
} from './pages/teaching/index';
import {
	Reviews,
	TeachingReview,
	InstructorReview,
	GeneralReview,
} from './pages/review/index';
import {
	Configuration,
	AdminDashboard,
	Users,
	Instructors,
	Students,
	Teachings,
	NewCourse,
	CreateStatement,
	CreateVaccine,
	AdminStatements,
} from './pages/admin/index';
import {
	MyCourses,
	MyGrades,
	Portfolio,
	Profile,
	Messages,
	Statements,
	DegreeCompletion,
	StatisticsReports,
	Activity,
} from './pages/user/index';
import Notes from './pages/note/Notes';
import Calendar from './components/calendar/Calendar';
import AdminCalendar from './components/admin/AdminCalendar';
import SharedLayout from './components/boilerplate/SharedLayout';
import ProtectedRoute from './components/boilerplate/ProtectedRoute';
import { ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
import { UserType } from './constants/enums';

export default function App() {
	const [theme, colorMode] = useMode();
	const { user } = useSelector((state) => state.auth);

	return (
		<>
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
								element={user ? <SharedLayout user={user} /> : <LandingPage />}
							>
								<Route index element={<Dashboard user={user} />} />
								<Route
									path="/admin/configuration"
									element={
										<ProtectedRoute user={user} allowedRoles={[UserType.admin]}>
											<Configuration />
										</ProtectedRoute>
									}
								/>
								<Route
									path="/admin/dashboard"
									element={
										<ProtectedRoute user={user} allowedRoles={[UserType.admin]}>
											<AdminDashboard />
										</ProtectedRoute>
									}
								/>
								<Route
									path="/admin/statements"
									element={
										<ProtectedRoute user={user}>
											<AdminStatements />
										</ProtectedRoute>
									}
								/>
								<Route
									path="/admin/calendar"
									element={
										<ProtectedRoute user={user} allowedRoles={[UserType.admin]}>
											<AdminCalendar />
										</ProtectedRoute>
									}
								/>
								<Route
									path="/users"
									element={
										<ProtectedRoute user={user} allowedRoles={[UserType.admin]}>
											<Users />
										</ProtectedRoute>
									}
								/>
								<Route
									path="/instructors"
									element={
										<ProtectedRoute user={user} allowedRoles={[UserType.admin]}>
											<Instructors />
										</ProtectedRoute>
									}
								/>
								<Route
									path="/students"
									element={
										<ProtectedRoute user={user} allowedRoles={[UserType.admin]}>
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
										<ProtectedRoute user={user} allowedRoles={[UserType.admin]}>
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
										<ProtectedRoute user={user} allowedRoles={[UserType.admin]}>
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
										<ProtectedRoute user={user}>
											<Statements />
										</ProtectedRoute>
									}
								/>
								<Route
									path="/statement/new"
									element={
										<ProtectedRoute user={user} allowedRoles={[UserType.admin]}>
											<CreateStatement />
										</ProtectedRoute>
									}
								/>
								<Route
									path="/vaccine/new"
									element={
										<ProtectedRoute user={user} allowedRoles={[UserType.admin]}>
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
											<Portfolio />
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
		</>
	);
}
