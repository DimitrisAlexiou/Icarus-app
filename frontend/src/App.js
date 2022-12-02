import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useGlobalContext } from './context';
import SharedLayout from './components/boilerplate/SharedLayout';
import ProtectedRoute from './components/ProtectedRoute';
import { Dashboard, LandingPage, NotFound, Profile } from './pages/index';
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
import Users from './pages/admin/Users';
import Professors from './pages/admin/Professors';
import Students from './pages/admin/Students';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import Unauthorized from './pages/auth/UnAuthorized';
import Forbidden from './pages/auth/Forbidden';
import history from './utils/history';
import './App.css';

export default function App() {
	return (
		<>
			<Router history={history}>
				<Routes>
					<Route path="/landing" element={<LandingPage />} />
					<Route path="/auth/register" element={<Register />} />
					<Route path="/auth/login" element={<Login />} />
					<Route path="/auth/forgot-password" element={<ForgotPassword />} />
					<Route path="*" element={<NotFound />} />
					<Route path="/" element={<SharedLayout />}>
						<Route index element={<Dashboard />} />
						<Route element={<ProtectedRoute />}>
							<Route path="/profile" element={<Profile />} />
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
							<Route
								path="/course/undergraduate/all"
								element={<UndergraduateCourses />}
							/>
							<Route path="/course/master/all" element={<MasterCourses />} />
						</Route>
						<Route
							path="/course/:courseId/prerequisites"
							element={<CoursePrerequisites />}
						/>
						<Route path="/course" element={<Courses />} />
						<Route path="/course/new" element={<NewCourse />} />
						<Route path="/review" element={<Reviews />} />
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
