import { lazy } from 'react';
import { UserType } from './constants/enums';
import { Configuration } from './pages/admin';
import { LandingPage, NotFound } from './pages';
import {
	ContactAdmin,
	Forbidden,
	ForgotPassword,
	Login,
	Register,
	UnAuthorized,
} from './pages/auth';
import { Master, Msc, Phd, Studies, Undergraduate } from './pages/course';

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

export const privateRoutes = [
	{
		path: '/admin/configuration',
		element: <Configuration />,
		allowedRoles: [UserType.admin],
	},
];
