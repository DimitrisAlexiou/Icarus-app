import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faBook,
	faUserGraduate,
	faChalkboardTeacher,
	faUsers,
	faBarsProgress,
	faFolderTree,
	faGears,
	faList,
	faScrewdriverWrench,
	faListCheck,
	faBookOpen,
	faPersonChalkboard,
	faCalendarDays,
	faChalkboard,
} from '@fortawesome/free-solid-svg-icons';
import { faUser, faNoteSticky, faMessage, faChartBar } from '@fortawesome/free-regular-svg-icons';

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
		path: '/statements',
		icon: <FontAwesomeIcon icon={faListCheck} />,
	},
	{
		id: 9,
		text: 'Grade Course',
		path: '/grade-course',
		icon: <FontAwesomeIcon icon={faPersonChalkboard} />,
	},
	{
		id: 10,
		text: 'Degree Completion',
		path: '/degree-completion',
		icon: <FontAwesomeIcon icon={faUserGraduate} />,
	},
];

export const sidebarAdminUtilityLinks = [
	{
		id: 11,
		text: 'Messages',
		path: '/messages',
		icon: <FontAwesomeIcon icon={faMessage} />,
	},
	{
		id: 12,
		text: 'Notes',
		path: '/note',
		icon: <FontAwesomeIcon icon={faNoteSticky} />,
	},
	{
		id: 13,
		text: 'Statistics & Reports',
		path: '/statistics-reports',
		icon: <FontAwesomeIcon icon={faChartBar} />,
	},
	{
		id: 14,
		text: 'Calendar',
		path: '/calendar',
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
		text: 'Assign Instructor',
		path: 'teaching/assign',
	},
	{
		id: 3,
		text: 'Teaching Grading',
		path: 'teaching/grading',
	},
	{
		id: 4,
		text: 'Statement',
		path: 'course/statement',
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
		text: 'Portfolio',
		path: '/portfolio',
		icon: <FontAwesomeIcon icon={faFolderTree} />,
	},
	{
		id: 5,
		text: 'Reviews',
		path: '/review',
		icon: <FontAwesomeIcon icon={faBarsProgress} />,
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
		text: 'My Courses',
		path: '/my-courses',
		icon: <FontAwesomeIcon icon={faBookOpen} />,
	},
	{
		id: 3,
		text: 'Course Grading',
		path: '/course-grading',
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
		icon: <FontAwesomeIcon className="fa-sm fa-fw mr-2 text-gray-400" icon={faUser} />,
	},
	{
		id: 2,
		text: 'Settings',
		path: '/user/settings',
		icon: <FontAwesomeIcon className="fa-sm fa-fw mr-2 text-gray-400" icon={faGears} />,
	},
	{
		id: 3,
		text: 'Activity Log',
		path: '/user/activity',
		icon: <FontAwesomeIcon className="fa-sm fa-fw mr-2 text-gray-400" icon={faList} />,
	},
];
