import { Row, Col } from 'reactstrap';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MessagesCard = () => {
	const messages = [];

	return (
		<>
			<Row className="justify-content-center animated--grow-in mb-3">
				<Col xs="12" sm="12" md="12" lg="10" xl="10">
					<h6
						style={{ fontWeight: 700, textAlign: 'center' }}
						className="text-gray-500 font-weight-bold"
					>
						Messages
					</h6>
				</Col>
			</Row>
			<div className="profile_card">
				<div className="card-body">
					<div className="align-items-center text-center">
						{messages.length > 0 ? (
							<></>
						) : (
							<span className="text-gray-500 animated--grow-in d-flex justify-content-center">
								<FontAwesomeIcon className="text-gray-300 px-2" icon={faSpinner} />
								You don't have any new messages.
							</span>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default MessagesCard;
