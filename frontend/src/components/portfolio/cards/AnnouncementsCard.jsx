import { Row, Col } from 'reactstrap';
import SpinnerComponent from '../../boilerplate/spinners/SpinnerMessage';

const AnnouncementsCard = ({ user }) => {
	const announcements = [];

	return (
		<>
			<Row className="justify-content-center animated--grow-in mb-3">
				<Col xs="12" sm="12" md="12" lg="10" xl="10">
					<h6
						style={{ textAlign: 'center' }}
						className="text-gray-500 font-weight-bold"
					>
						<small
							className="text-muted pill-label"
							style={{
								fontWeight: '700',
								fontSize: 15,
							}}
						>
							Announcements
						</small>
					</h6>
				</Col>
			</Row>
			<div className="profile_card">
				<div className="card-body">
					<div className="align-items-center text-center">
						{announcements.length > 0 ? (
							<></>
						) : (
							<SpinnerComponent message="You don't have any new announcements." />
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default AnnouncementsCard;
