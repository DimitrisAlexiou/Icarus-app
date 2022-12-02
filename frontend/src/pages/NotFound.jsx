import { Link } from 'react-router-dom';
import img from '../assets/images/undraw_page_not_found.svg';

export default function NotFound() {
	return (
		<div className="container-fluid d-flex error-page">
			<div className="text-center">
				<div className="error mx-auto" data-text="404">
					404
				</div>
				<p class="lead text-gray-800 mb-5">The page you're looking to doesn't exist !</p>
				<div className="row justify-content-center">
					<img className="error-page-img mt-3 mb-6" src={img} alt="not found" />
					<div class="col-lg-12">
						<p class="text-gray-500 mb-4">
							Seems like you are trying to access...clouds
						</p>
					</div>
				</div>
				<Link to="/" style={{ textDecoration: 'none' }}>
					Back to Reality
				</Link>
			</div>
		</div>
	);
}
