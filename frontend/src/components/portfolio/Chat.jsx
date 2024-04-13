import { Row, Col } from 'reactstrap';
import SpinnerComponent from '../boilerplate/spinners/SpinnerMessage';

export default function Chat() {
	return (
		<>
			<Row className="justify-content-center animated--grow-in">
				<Col xs="12" sm="12" md="12" lg="10" xl="10">
					<h6 className="text-gray-500 font-weight-bold">Chat</h6>
				</Col>
			</Row>
			<Row className="animated--grow-in text-gray-500">
				<Col>
					<SpinnerComponent message="To be implemented." />
				</Col>
			</Row>
		</>
	);
}
