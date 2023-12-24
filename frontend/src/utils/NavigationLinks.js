import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faBook,
	faUserGraduate,
	faChalkboardTeacher,
	faUsers,
	faBarsProgress,
	faGears,
	faList,
	faScrewdriverWrench,
	faListCheck,
	faBookOpen,
	faPersonChalkboard,
	faCalendarDays,
	faChalkboard,
	faLaptopCode,
	faInbox,
	faArrowUp91,
	faMagnifyingGlass,
	faNetworkWired,
} from '@fortawesome/free-solid-svg-icons';
import {
	faUser,
	faNoteSticky,
	faMessage,
	faChartBar,
	faFolderOpen,
	faComments,
	faCalendarCheck,
} from '@fortawesome/free-regular-svg-icons';

export const sidebarAdminSystemLinks = [
	{
		id: 1,
		text: 'Configuration',
		path: '/admin/configuration',
		icon: <FontAwesomeIcon icon={faScrewdriverWrench} />,
	},
	{
		id: 2,
		text: 'Students',
		path: '/students',
		icon: <FontAwesomeIcon icon={faUserGraduate} />,
	},
	{
		id: 3,
		text: 'Instructors',
		path: '/instructors',
		icon: <FontAwesomeIcon icon={faChalkboardTeacher} />,
	},
	{
		id: 4,
		text: 'Users',
		path: '/users',
		icon: <FontAwesomeIcon icon={faUsers} />,
	},
	{
		id: 5,
		text: 'Courses',
		path: '/course',
		icon: <FontAwesomeIcon icon={faBook} />,
	},
];

export const sidebarAdminDataLinks = [
	{
		id: 6,
		text: 'Teachings',
		path: '/teachings',
		icon: <FontAwesomeIcon icon={faChalkboard} />,
	},
	{
		id: 7,
		text: 'Reviews',
		path: '/review',
		icon: <FontAwesomeIcon icon={faBarsProgress} />,
	},
	{
		id: 8,
		text: 'Statements',
		path: '/admin/statements',
		icon: <FontAwesomeIcon icon={faListCheck} />,
	},
	{
		id: 9,
		text: 'Degree Completion',
		path: '/degree-completion',
		icon: <FontAwesomeIcon icon={faUserGraduate} />,
	},
];

export const sidebarAdminUtilityLinks = [
	{
		id: 10,
		text: 'Messages',
		path: '/messages',
		icon: <FontAwesomeIcon icon={faMessage} />,
	},
	{
		id: 11,
		text: 'Notes',
		path: '/note',
		icon: <FontAwesomeIcon icon={faNoteSticky} />,
	},
	{
		id: 12,
		text: 'Statistics & Reports',
		path: '/statistics-reports',
		icon: <FontAwesomeIcon icon={faChartBar} />,
	},
	{
		id: 13,
		text: 'Calendar',
		path: '/admin/calendar',
		icon: <FontAwesomeIcon icon={faCalendarDays} />,
	},
];

export const sidebarCourseConfigDropDown = [
	{
		id: 1,
		text: 'Add Course',
		path: 'course/new',
	},
	{
		id: 2,
		text: 'Create Statement',
		path: 'statement/new',
	},
	{
		id: 3,
		text: 'Create Vaccine',
		path: 'vaccine/new',
	},
	{
		id: 4,
		text: 'Assign Instructor',
		path: 'teaching/assign',
	},
	{
		id: 5,
		text: 'Teaching Grading',
		path: 'teaching/grading',
	},
];

export const sidebarStudentCourseLinks = [
	{
		id: 1,
		text: 'Courses',
		path: '/course',
		icon: <FontAwesomeIcon icon={faBook} />,
	},
	{
		id: 2,
		text: 'My Courses',
		path: '/my-courses',
		icon: <FontAwesomeIcon icon={faBookOpen} />,
	},
	{
		id: 3,
		text: 'Statements',
		path: '/statements',
		icon: <FontAwesomeIcon icon={faListCheck} />,
	},
];

export const sidebarStudentDataLinks = [
	{
		id: 4,
		text: 'My Grades',
		path: '/my-grades',
		icon: <FontAwesomeIcon icon={faArrowUp91} />,
	},
	{
		id: 5,
		text: 'Reviews',
		path: '/review',
		icon: <FontAwesomeIcon icon={faMagnifyingGlass} />,
	},
	{
		id: 6,
		text: 'Degree Completion',
		path: '/degree-completion',
		icon: <FontAwesomeIcon icon={faUserGraduate} />,
	},
];

export const sidebarStudentUtilityLinks = [
	{
		id: 7,
		text: 'Messages',
		path: '/messages',
		icon: <FontAwesomeIcon icon={faMessage} />,
	},
	{
		id: 8,
		text: 'Notes',
		path: '/note',
		icon: <FontAwesomeIcon icon={faNoteSticky} />,
	},
	{
		id: 9,
		text: 'Statistics & Reports',
		path: '/statistics-reports',
		icon: <FontAwesomeIcon icon={faChartBar} />,
	},
	{
		id: 10,
		text: 'Calendar',
		path: '/calendar',
		icon: <FontAwesomeIcon icon={faCalendarDays} />,
	},
];

export const sidebarInstructorCourseLinks = [
	{
		id: 1,
		text: 'Courses',
		path: '/course',
		icon: <FontAwesomeIcon icon={faBook} />,
	},
	{
		id: 2,
		text: 'My Teachings',
		path: '/teachings',
		icon: <FontAwesomeIcon icon={faBookOpen} />,
	},
	{
		id: 3,
		text: 'Teaching Grading',
		path: '/teaching/grading',
		icon: <FontAwesomeIcon icon={faPersonChalkboard} />,
	},
];

export const sidebarInstructorUtilityLinks = [
	{
		id: 4,
		text: 'Messages',
		path: '/messages',
		icon: <FontAwesomeIcon icon={faMessage} />,
	},
	{
		id: 5,
		text: 'Notes',
		path: '/note',
		icon: <FontAwesomeIcon icon={faNoteSticky} />,
	},
	{
		id: 6,
		text: 'Statistics & Reports',
		path: '/statistics-reports',
		icon: <FontAwesomeIcon icon={faChartBar} />,
	},
	{
		id: 7,
		text: 'Calendar',
		path: '/calendar',
		icon: <FontAwesomeIcon icon={faCalendarDays} />,
	},
];

export const navbarLinks = [
	{
		id: 1,
		text: 'Profile',
		path: '/user/profile',
		icon: (
			<FontAwesomeIcon
				className="fa-sm fa-fw mr-2 text-gray-400"
				icon={faUser}
			/>
		),
	},
	{
		id: 2,
		text: 'Settings',
		path: '/user/settings',
		icon: (
			<FontAwesomeIcon
				className="fa-sm fa-fw mr-2 text-gray-400"
				icon={faGears}
			/>
		),
	},
	{
		id: 3,
		text: 'Activity Log',
		path: '/user/activity',
		icon: (
			<FontAwesomeIcon
				className="fa-sm fa-fw mr-2 text-gray-400"
				icon={faList}
			/>
		),
	},
];

export const portfolioCategories = [
	{
		id: 1,
		text: 'Documents',
		icon: <FontAwesomeIcon icon={faFolderOpen} />,
	},
	{
		id: 2,
		text: 'Announcements',
		icon: <FontAwesomeIcon icon={faInbox} />,
	},
	{
		id: 3,
		text: 'Exercises',
		icon: <FontAwesomeIcon icon={faLaptopCode} />,
	},
	{
		id: 4,
		text: 'Calendar',
		icon: <FontAwesomeIcon icon={faCalendarCheck} />,
	},
	{
		id: 5,
		text: 'Messages',
		icon: <FontAwesomeIcon icon={faMessage} />,
	},
	{
		id: 6,
		text: 'Chat',
		icon: <FontAwesomeIcon icon={faComments} />,
	},
];

export const activityCategories = [
	{
		id: 1,
		text: 'Reviews',
		icon: <FontAwesomeIcon icon={faBarsProgress} />,
	},
	{
		id: 2,
		text: 'ACTIVITY',
		icon: <FontAwesomeIcon icon={faInbox} />,
	},
	{
		id: 3,
		text: 'ACTIVITY',
		icon: <FontAwesomeIcon icon={faLaptopCode} />,
	},
];

export const myGradesCategories = [
	{
		id: 1,
		text: 'Recent Grades',
	},
	{
		id: 2,
		text: 'Transcript of Records',
	},
	{
		id: 3,
		text: 'Thesis',
	},
];

export const degreeCompletionCategories = [
	{
		id: 1,
		text: 'Prerequisites',
		icon: <FontAwesomeIcon icon={faNetworkWired} />,
	},
	{
		id: 2,
		text: 'Progress',
		icon: <FontAwesomeIcon icon={faBarsProgress} />,
	},
];
