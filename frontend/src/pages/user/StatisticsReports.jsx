import { Row, Col } from 'reactstrap';
import Header from '../../components/boilerplate/headers/Header';
import SpinnerComponent from '../../components/boilerplate/spinners/SpinnerMessage';

export default function StatisticsReports() {
	return (
		<>
			<Header title="Statistics & Reports" />
			<Row className="animated--grow-in text-gray-500">
				<Col>
					<SpinnerComponent message="To be implemented." />
				</Col>
			</Row>
		</>
	);
}
