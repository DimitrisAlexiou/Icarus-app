import { Link } from 'react-router-dom';

export default function Notification({ icon, message, link, linkMessage }) {
	return (
		<div id="content-wrapper" className="d-flex flex-column">
			<div id="content">
				<div className="container-fluid">
					<div className="text-center">
						<div className="error mx-auto mb-5 mt-5">{icon}</div>
						<p className="text-gray-500 mb-4">{message}</p>
						<Link
							className="btn btn-light-cornflower-blue btn-small align-self-center"
							to={link}
							style={{ textDecoration: 'none' }}
						>
							{linkMessage}
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
