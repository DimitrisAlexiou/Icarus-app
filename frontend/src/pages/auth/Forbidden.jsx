import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';

export default function Forbidden() {
	return (
		<div className="container-fluid">
			<div className="text-center">
				<div className="error mx-auto" data-text="403">
					403
				</div>
				<p className="lead text-gray-800 mb-5">Not authorized to view this page !</p>
				<p className="text-gray-500 mb-0">Sorry, this is as far as you can go...</p>
				<Row className="justify-content-center">
					{/* <img
								className="notauthorized"
								src="undraw_not_authorized.svg"
								alt="Forbidden"
							/>  */}
					<Col lg="4">
						<p className="text-gray-500 mb-0">
							Seems like you are not authorized to access this page !
						</p>
					</Col>
				</Row>
				<Link to="/" style={{ textDecoration: 'none' }}>
					Back to Reality
				</Link>
			</div>
		</div>
	);
}
