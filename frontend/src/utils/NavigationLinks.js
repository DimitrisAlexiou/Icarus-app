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
} from '@fortawesome/free-solid-svg-icons';
import { faUser, faNoteSticky, faMessage, faChartBar } from '@fortawesome/free-regular-svg-icons';

export const sidebarLinks = [
	{
		id: 1,
		text: 'Courses',
		path: '/course',
		icon: <FontAwesomeIcon icon={faBook} />,
	},
];

export const sidebarAdminLinks = [
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
		text: 'Professors',
		path: '/professors',
		icon: <FontAwesomeIcon icon={faChalkboardTeacher} />,
	},
	{
		id: 4,
		text: 'Users',
		path: '/users',
		icon: <FontAwesomeIcon icon={faUsers} />,
	},
];

export const sidebarStudentLinks = [
	{
		id: 1,
		text: 'My Courses',
		path: '/my-courses',
		icon: <FontAwesomeIcon icon={faBookOpen} />,
	},
	{
		id: 2,
		text: 'Reviews',
		path: '/review',
		icon: <FontAwesomeIcon icon={faBarsProgress} />,
	},
	{
		id: 3,
		text: 'Statements',
		path: '/statements',
		icon: <FontAwesomeIcon icon={faListCheck} />,
	},
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
		text: 'Degree Completion',
		path: '/degree-completion',
		icon: <FontAwesomeIcon icon={faUserGraduate} />,
	},
	{
		id: 7,
		text: 'Portfolio',
		path: '/portfolio',
		icon: <FontAwesomeIcon icon={faFolderTree} />,
	},
	{
		id: 8,
		text: 'Statistics & Reports',
		path: '/reports',
		icon: <FontAwesomeIcon icon={faChartBar} />,
	},
];

export const sidebarInstructorLinks = [
	{
		id: 1,
		text: 'My Courses',
		path: '/my-courses',
		icon: <FontAwesomeIcon icon={faBookOpen} />,
	},
	{
		id: 2,
		text: 'Course Grading',
		path: '/course-grading',
		icon: <FontAwesomeIcon icon={faPersonChalkboard} />,
	},
	{
		id: 3,
		text: 'Messages',
		path: '/messages',
		icon: <FontAwesomeIcon icon={faMessage} />,
	},
	{
		id: 4,
		text: 'Notes',
		path: '/note',
		icon: <FontAwesomeIcon icon={faNoteSticky} />,
	},
	{
		id: 5,
		text: 'Statistics & Reports',
		path: '/reports',
		icon: <FontAwesomeIcon icon={faChartBar} />,
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
