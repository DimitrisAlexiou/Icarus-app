import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

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
						</div>
					</div>
					<Footer />
				</div>
			</div>
		</>
	);
}
