import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

export default function Unauthorized() {
	const { loginWithRedirect } = useAuth0();

	return (
		<div id="content-wrapper" className="d-flex flex-column">
			<div id="content">
				<div className="container-fluid">
					<div className="text-center">
						<div className="error mx-auto" data-text="401">
							401
						</div>
						<p className="text-gray-500 mb-0">
							It looks like you found a glitch in the matrix...
						</p>
						<div className="row justify-content-center">
							{/* <img
								className="notauthorized"
								src="undraw_not_authorized.svg"
								alt="Unauthorized"
							/>  */}
							<div className="col-lg-4">
								<Button
									className="nav-link text-gray-600 mb-0"
									color="null"
									onClick={() => loginWithRedirect()}
								>
									Please log in to access !
								</Button>
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
