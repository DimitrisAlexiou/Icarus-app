import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faBook,
	faUserGraduate,
	faChalkboardTeacher,
	faUsers,
	faWrench,
	faBarsProgress,
	faFolderTree,
	faUnlock,
	faIdCard,
	faGraduationCap,
	faUser,
	faCogs,
	faList,
	faSignOut,
	faBarsStaggered,
} from '@fortawesome/free-solid-svg-icons';

export const sidebarLinks = [
	{
		id: 1,
		text: 'Courses',
		path: '/course',
		icon: <FontAwesomeIcon icon={faBook} />,
	},
	{
		id: 2,
		text: 'Reviews',
		path: '/review',
		icon: <FontAwesomeIcon icon={faBarsProgress} />,
	},
	{
		id: 3,
		text: 'Students',
		path: '/students',
		icon: <FontAwesomeIcon icon={faUserGraduate} />,
	},
	{
		id: 4,
		text: 'Professors',
		path: '/professors',
		icon: <FontAwesomeIcon icon={faChalkboardTeacher} />,
	},
	{
		id: 5,
		text: 'Users',
		path: '/users',
		icon: <FontAwesomeIcon icon={faUsers} />,
	},
	{
		id: 6,
		text: 'Portfolio',
		path: '/portfolio',
		icon: <FontAwesomeIcon icon={faFolderTree} />,
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
		icon: <FontAwesomeIcon className="fa-sm fa-fw mr-2 text-gray-400" icon={faCogs} />,
	},
	{
		id: 3,
		text: 'Activity Log',
		path: '/user/activity',
		icon: <FontAwesomeIcon className="fa-sm fa-fw mr-2 text-gray-400" icon={faList} />,
	},
];

export const sidebarAdminLinks = [
	{
		id: 1,
		text: 'Dashboard',
		path: '/admin/dashboard',
		icon: <FontAwesomeIcon className="fa-sm fa-fw mr-2 text-gray-400" icon={faUser} />,
	},
	{
		id: 2,
		text: 'Configuration',
		path: '/admin/configuration',
		icon: <FontAwesomeIcon className="fa-sm fa-fw mr-2 text-gray-400" icon={faCogs} />,
	},
];
