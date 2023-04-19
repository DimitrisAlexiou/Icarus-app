import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import { getLastPageFromLocalStorage } from '../utils/localStorage';
import img from '../assets/images/undraw_page_not_found.svg';

export default function NotFound() {
	const lastPage = getLastPageFromLocalStorage();
	const linkTo = lastPage || '/';

	return (
		<div className="d-flex error-page animated--grow-in">
			<div className="text-center">
				<div className="error mx-auto mb-4" data-text="404">
					404
				</div>
				<p className="lead text-gray-800 mb-5">
					The page you're looking to doesn't exist !
				</p>
				<Row className="justify-content-center mb-4">
					<img className="error-page-img mt-3 mb-5 notfound" src={img} alt="not found" />
					<Col lg="12">
						<p className="text-gray-500 mb-4">
							Seems like you are trying to access . . . clouds
						</p>
					</Col>
				</Row>
				<Link to={getLastPageFromLocalStorage()} style={{ textDecoration: 'none' }}>
					Back to Reality
				</Link>
			</div>
		</div>
	);
}
