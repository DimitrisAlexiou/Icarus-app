import { Row, Col } from 'reactstrap';
import SpinnerComponent from '../../boilerplate/spinners/SpinnerMessage';
import PillHeader from '../../boilerplate/headers/PillHeader';

const AnnouncementsCard = ({ user }) => {
	const announcements = [];

	return (
		<>
			<Row className="justify-content-center animated--grow-in mb-3">
				<Col className="text-center">
					<PillHeader title="Announcements" />
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
