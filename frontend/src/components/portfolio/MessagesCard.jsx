import { Row, Col } from 'reactstrap';
import SpinnerComponent from '../boilerplate/spinners/SpinnerMessage';

const MessagesCard = () => {
	const messages = [];

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
							Messages
						</small>
					</h6>
				</Col>
			</Row>
			<div className="profile_card">
				<div className="card-body">
					<div className="align-items-center text-center">
						{messages.length > 0 ? (
							<></>
						) : (
							<SpinnerComponent message="You don't have any new messages." />
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default MessagesCard;
