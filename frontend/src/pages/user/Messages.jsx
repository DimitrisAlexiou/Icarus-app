import { Row, Col } from 'reactstrap';
import Header from '../../components/boilerplate/headers/Header';
import SpinnerComponent from '../../components/boilerplate/spinners/SpinnerMessage';

export default function Messages() {
	return (
		<>
			<Header title="Messages" />
			<Row className="animated--grow-in text-gray-500">
				<Col>
					<SpinnerComponent message="To be implemented." />
				</Col>
			</Row>
		</>
	);
}
