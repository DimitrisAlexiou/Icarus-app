import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';

export default function UnAuthorized() {
	return (
		<div className="container-fluid animated--grow-in mt-5">
			<div className="text-center">
				<div className="error mx-auto mb-3" data-text="401">
					401
				</div>
				<p className="text-gray-500 mb-3">Your login session has expired...</p>
				<Row className="justify-content-center mb-5">
					<img
						className="notauthorized"
						src="undraw_not_authorized.svg"
						alt="Unauthorized"
					/>
					<Col md="4">
						<Link
							to="/auth/login"
							style={{
								textDecoration: 'none',
								textAlign: 'center',
							}}
						>
							Please log in to access !
						</Link>
					</Col>
				</Row>
				<Link to="/" style={{ textDecoration: 'none' }}>
					Back to Reality
				</Link>
			</div>
		</div>
	);
}
