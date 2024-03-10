import { Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
import { SemesterProvider } from './context/SemesterProvider';
import { LandingPage } from './pages/index';
import {
	adminRoutes,
	instructorRoutes,
	privateRoutes,
	publicRoutes,
	studentRoutes,
} from './routes';
import SharedLayout from './components/boilerplate/SharedLayout';
import ProtectedRoute from './components/boilerplate/ProtectedRoute';
import Spinner from './components/boilerplate/spinners/Spinner';

const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));

export default function App() {
	const [theme, colorMode] = useMode();
	const { user } = useSelector((state) => state.auth);

	return (
		<>
			<Suspense fallback={<Spinner />}>
				<ColorModeContext.Provider value={colorMode}>
					<ThemeProvider theme={theme}>
						<SemesterProvider>
							<Router>
								<Routes>
									{publicRoutes.map((route) => (
										<Route
											key={route.path}
											path={route.path}
											element={route.element}
										/>
									))}
									<Route
										path="/"
										element={
											user ? <SharedLayout user={user} /> : <LandingPage />
										}
									>
										<Route index element={<Dashboard />} />
										{adminRoutes.map((route) => (
											<Route
												key={route.path}
												path={route.path}
												element={
													<ProtectedRoute
														user={user}
														allowedRoles={route.allowedRoles}
													>
														{route.element}
													</ProtectedRoute>
												}
											/>
										))}
										{instructorRoutes.map((route) => (
											<Route
												key={route.path}
												path={route.path}
												element={
													<ProtectedRoute
														user={user}
														allowedRoles={route.allowedRoles}
													>
														{route.element}
													</ProtectedRoute>
												}
											/>
										))}
										{studentRoutes.map((route) => (
											<Route
												key={route.path}
												path={route.path}
												element={
													<ProtectedRoute
														user={user}
														allowedRoles={route.allowedRoles}
													>
														{route.element}
													</ProtectedRoute>
												}
											/>
										))}
										{privateRoutes.map((route) => (
											<Route
												key={route.path}
												path={route.path}
												element={
													<ProtectedRoute
														user={user}
														allowedRoles={route.allowedRoles}
													>
														{route.element}
													</ProtectedRoute>
												}
											/>
										))}
									</Route>
								</Routes>
							</Router>
						</SemesterProvider>
					</ThemeProvider>
				</ColorModeContext.Provider>
			</Suspense>
		</>
	);
}
