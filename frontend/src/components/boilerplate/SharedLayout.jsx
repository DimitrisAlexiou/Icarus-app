import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import GoToTop from './GoToTop';

export default function SharedLayout() {
	const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
	const [smallSidebar, setSmallSidebar] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth <= 768) {
				setSidebarCollapsed(true);
				setSmallSidebar(true);
			} else if (window.innerWidth <= 425) {
				setSmallSidebar(true);
			} else {
				setSmallSidebar(false);
				setSidebarCollapsed(false);
			}
		};
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [setSidebarCollapsed]);

	return (
		<>
			<div id="wrapper">
				<Sidebar
					isSidebarCollapsed={isSidebarCollapsed}
					setSidebarCollapsed={setSidebarCollapsed}
					smallSidebar={smallSidebar}
					setSmallSidebar={setSmallSidebar}
				/>
				<div id="content-wrapper" className="d-flex flex-column">
					<div id="content">
						<Navbar
							isSidebarCollapsed={isSidebarCollapsed}
							setSidebarCollapsed={setSidebarCollapsed}
						/>
						<div className="container-fluid">
							<Outlet />
							<GoToTop />
						</div>
					</div>
					<Footer />
				</div>
			</div>
		</>
	);
}
