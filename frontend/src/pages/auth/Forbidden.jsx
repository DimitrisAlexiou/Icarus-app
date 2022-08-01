import { Link } from 'react-router-dom';

export default function Forbidden() {
	return (
		<div id="content-wrapper" className="d-flex flex-column">
			<div id="content">
				<div className="container-fluid">
					<div className="text-center">
						<div className="error mx-auto" data-text="403">
							403
						</div>
						<p class="lead text-gray-800 mb-5">
							Not authorized to view this page !
						</p>
						<p className="text-gray-500 mb-0">
							It looks like you found a glitch in the matrix...
						</p>
						<div className="row justify-content-center">
							{/* <img
								className="notauthorized"
								src="undraw_not_authorized.svg"
								alt="Forbidden"
							/>  */}
							<div class="col-lg-4">
								<p class="text-gray-500 mb-0">
									Seems like you are not authorized to access this page !
								</p>
							</div>
						</div>
						<Link to="/" style={{ textDecoration: 'none' }}>
							Back to Reality
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
