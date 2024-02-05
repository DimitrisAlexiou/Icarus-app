import { lazy } from 'react';
import { UserType } from './constants/enums';
import { LandingPage, NotFound } from './pages';
import {
	ContactAdmin,
	Forbidden,
	ForgotPassword,
	Login,
	Register,
	UnAuthorized,
} from './pages/auth';
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
import {
	TeachingReview,
	InstructorReview,
	GeneralReview,
} from './pages/review/index';
import { NewCourse, CreateStatement, CreateVaccine } from './pages/admin/index';
import { Phd, Course, Master } from './pages/course/index';
import { Teaching } from './pages/teaching/index';
import Directory from './pages/teaching/Directory';

const Configuration = lazy(() => import('./pages/admin/Configuration'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminStatements = lazy(() =>
	import('./pages/admin/statement/AdminStatements')
);
const AdminAnnouncements = lazy(() =>
	import('./pages/admin/AdminAnnouncements')
);
const AdminCalendar = lazy(() => import('./components/admin/AdminCalendar'));
const AssignTeachingInstructor = lazy(() =>
	import('./pages/teaching/AssignTeachingInstructor')
);
const TeachingGrading = lazy(() => import('./pages/teaching/TeachingGrading'));
const Users = lazy(() => import('./pages/admin/users/Users'));
const Instructors = lazy(() => import('./pages/admin/users/Instructors'));
const Students = lazy(() => import('./pages/admin/users/Students'));
const Teachings = lazy(() => import('./pages/admin/Teachings'));
const Courses = lazy(() => import('./pages/course/Courses'));
const Undergraduate = lazy(() => import('./pages/course/Undergraduate'));
const Msc = lazy(() => import('./pages/course/Msc'));
const Studies = lazy(() => import('./pages/course/Studies'));
const Reviews = lazy(() => import('./pages/review/Reviews'));
const Announcements = lazy(() => import('./pages/user/Announcements'));
const Notes = lazy(() => import('./pages/note/Notes'));
const Calendar = lazy(() => import('./components/calendar/Calendar'));
const StatisticsReports = lazy(() => import('./pages/user/StatisticsReports'));
const Grades = lazy(() => import('./pages/user/Grades'));

export const publicRoutes = [
	{
		path: '/landing',
		element: <LandingPage />,
	},
	{
		path: '/auth/register',
		element: <Register />,
	},
	{
		path: '/auth/login',
		element: <Login />,
	},
	{
		path: '/auth/forgot-password',
		element: <ForgotPassword />,
	},
	{
		path: '/auth/contact-admin',
		element: <ContactAdmin />,
	},
	{
		path: '/forbidden',
		element: <Forbidden />,
	},
	{
		path: '/unauthorized',
		element: <UnAuthorized />,
	},
	{
		path: '/studies',
		element: <Studies />,
	},
	{
		path: '/studies/undergraduate',
		element: <Undergraduate />,
	},
	{
		path: '/studies/msc',
		element: <Msc />,
	},
	{
		path: '/studies/msc/master',
		element: <Master />,
	},
	{
		path: '/studies/phd',
		element: <Phd />,
	},
	{
		path: '*',
		element: <NotFound />,
	},
];

export const adminRoutes = [
	{
		path: '/admin/configuration',
		element: <Configuration />,
		allowedRoles: [UserType.admin],
	},
	{
		path: '/admin/dashboard',
		element: <AdminDashboard />,
		allowedRoles: [UserType.admin],
	},
	{
		path: '/admin/statements',
		element: <AdminStatements />,
		allowedRoles: [UserType.admin],
	},
	{
		path: '/admin/announcements',
		element: <AdminAnnouncements />,
		allowedRoles: [UserType.admin],
	},
	{
		path: '/admin/calendar',
		element: <AdminCalendar />,
		allowedRoles: [UserType.admin],
	},
	{
		path: '/users',
		element: <Users />,
		allowedRoles: [UserType.admin],
	},
	{
		path: '/instructors',
		element: <Instructors />,
		allowedRoles: [UserType.admin],
	},
	{
		path: '/students',
		element: <Students />,
		allowedRoles: [UserType.admin],
	},
	{
		path: '/teaching/assign',
		element: <AssignTeachingInstructor />,
		allowedRoles: [UserType.admin],
	},
	{
		path: '/course/new',
		element: <NewCourse />,
		allowedRoles: [UserType.admin],
	},
	{
		path: '/statement/new',
		element: <CreateStatement />,
		allowedRoles: [UserType.admin],
	},
	{
		path: '/vaccine/new',
		element: <CreateVaccine />,
		allowedRoles: [UserType.admin],
	},
];

export const instructorRoutes = [
	{
		path: '/teachings',
		element: <Teachings />,
		allowedRoles: [UserType.admin, UserType.instructor],
	},
	{
		path: '/teaching/grading',
		element: <TeachingGrading />,
		allowedRoles: [UserType.admin, UserType.instructor],
	},
	{
		path: '/announcement',
		element: <Announcements />,
		allowedRoles: [UserType.admin, UserType.instructor],
	},
	{
		path: '/grades',
		element: <Grades />,
		allowedRoles: [UserType.admin, UserType.instructor],
	},
	{
		path: '/teaching/:teachingId/portfolio/directory',
		element: <Directory />,
		allowedRoles: [UserType.admin, UserType.instructor],
	},
];

export const studentRoutes = [
	{
		path: '/my-courses',
		element: <MyCourses />,
		allowedRoles: [UserType.student],
	},
	{
		path: '/statements',
		element: <Statements />,
		allowedRoles: [UserType.admin, UserType.student],
	},
	{
		path: '/my-grades',
		element: <MyGrades />,
		allowedRoles: [UserType.student],
	},
	{
		path: '/degree-completion',
		element: <DegreeCompletion />,
		allowedRoles: [UserType.student],
	},
	{
		path: '/review/teaching',
		element: <TeachingReview />,
		allowedRoles: [UserType.admin, UserType.student],
	},
	{
		path: '/review/instructor',
		element: <InstructorReview />,
		allowedRoles: [UserType.admin, UserType.student],
	},
	{
		path: '/review/general',
		element: <GeneralReview />,
		allowedRoles: [UserType.admin, UserType.student],
	},
];

export const privateRoutes = [
	{
		path: '/user/profile',
		element: <Profile />,
	},
	{
		path: '/user/activity',
		element: <Activity />,
	},
	{
		path: '/teaching/:teachingId',
		element: <Teaching />,
	},
	{
		path: '/course',
		element: <Courses />,
	},
	{
		path: '/course/undergraduate',
		element: <Undergraduate />,
	},
	{
		path: '/course/msc',
		element: <Msc />,
	},
	{
		path: '/course/msc/:masterId',
		element: <Master />,
	},
	{
		path: '/course/phd',
		element: <Phd />,
	},
	{
		path: '/course/:courseId',
		element: <Course />,
	},
	{
		path: '/review',
		element: <Reviews />,
	},
	{
		path: '/messages',
		element: <Messages />,
	},
	{
		path: '/statistics-reports',
		element: <StatisticsReports />,
	},
	{
		path: '/teaching/:teachingId/portfolio',
		element: <Portfolio />,
	},
	{
		path: '/note',
		element: <Notes />,
	},
	{
		path: '/calendar',
		element: <Calendar />,
	},
];
