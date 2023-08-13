import { Col } from 'reactstrap';
import BackButton from '../buttons/BackButton';

export default function Notification({ icon, message, link, linkMessage }) {
	return (
		<div className="animated--grow-in">
			<div className="text-center">
				<i className="fa-3x mx-auto mb-5 mt-5">{icon}</i>
				<p className="text-gray-500 mt-5 mb-5">{message}</p>
				<Col className="d-flex justify-content-center align-self-center">
					<BackButton url={link} />
				</Col>
				{/* <Link
					className="btn btn-light-cornflower-blue align-self-center"
					to={link}
					style={{ textDecoration: 'none' }}
				>
					{linkMessage}
				</Link> */}
			</div>
		</div>
	);
}
