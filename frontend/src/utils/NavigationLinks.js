import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faBook,
	faUserGraduate,
	faChalkboardTeacher,
	faUsers,
	faWrench,
	faBarsProgress,
	faFolderTree,
} from '@fortawesome/free-solid-svg-icons';

const dataLinks = [
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
// {
// 	id: 6,
// 	text: 'Register',
// 	path: '/auth/register',
// 	icon: <FontAwesomeIcon icon={faIdCard} />,
// },
// {
// 	id: 7,
// 	text: 'Login',
// 	path: '/auth/login',
// 	icon: <FontAwesomeIcon icon={faUnlock} />,
// },

export default dataLinks;
