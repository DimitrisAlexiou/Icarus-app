import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import GoToTop from './GoToTop';

export default function SharedLayout() {
	return (
		<>
			<div id="wrapper">
				<Sidebar />
				<div id="content-wrapper" className="d-flex flex-column">
					<div id="content">
						<Navbar />
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
