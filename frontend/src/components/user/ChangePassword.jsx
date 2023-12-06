import { Row, Col } from 'reactstrap';
import ChangePasswordForm from '../auth/ChangePasswordForm';

export default function ChangePassword({ user }) {
	return (
		<>
			<h5 className="text-gray-700 font-weight-bold animated--grow-in mb-4 mx-4">
				Change Password
			</h5>

			<Row className="d-flex justify-content-center">
				<Col xl="8" lg="8" md="10" sm="12" xs="12">
					<div className="profile_card animated--grow-in">
						<div className="card-body">
							<ChangePasswordForm user={user} />
						</div>
					</div>
				</Col>
			</Row>
		</>
	);
}
