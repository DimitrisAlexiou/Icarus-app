import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import { getLastPageFromLocalStorage } from '../../utils/localStorage';

export default function Forbidden() {
	const lastPage = getLastPageFromLocalStorage();
	const linkTo = lastPage || '/';

	return (
		<div className="d-flex error-page animated--grow-in">
			<div className="text-center">
				<div className="error mx-auto mb-4" data-text="403">
					403
				</div>
				<p className="lead text-gray-800 mb-5">
					Not authorized to view this page !
				</p>
				<p className="text-gray-500 mb-3">
					Sorry, this is as far as you can go...
				</p>
				<Row className="justify-content-center mb-5">
					<img
						className="error-page-img mt-3 mb-5 notfound"
						src="undraw_warning.svg"
						alt="Forbidden"
					/>
					<Col lg="12">
						<p className="text-gray-500 mb-4">
							Seems like you are not authorized to access this page !
						</p>
					</Col>
				</Row>
				<Link to={linkTo} style={{ textDecoration: 'none' }}>
					Back to Reality
				</Link>
			</div>
		</div>
	);
}
