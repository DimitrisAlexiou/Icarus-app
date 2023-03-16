import { Link } from 'react-router-dom';

export default function Notification({ icon, message, link, linkMessage }) {
	return (
		<div className="animated--grow-in">
			<div className="text-center">
				<i className="fa-3x mx-auto mb-5 mt-5">{icon}</i>
				<p className="text-gray-500 mt-5 mb-5">{message}</p>
				<Link
					className="btn btn-light-cornflower-blue align-self-center"
					to={link}
					style={{ textDecoration: 'none' }}
				>
					{linkMessage}
				</Link>
			</div>
		</div>
	);
}
