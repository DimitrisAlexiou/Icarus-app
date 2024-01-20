import { Col, Row } from 'reactstrap';
import CurrentSemester from '../CurrentSemester';

export default function HeaderWithSemester({ title }) {
	return (
		<>
			<Row className="mb-4 animated--grow-in">
				<Col>
					<h3 className="text-gray-800 font-weight-bold">{title}</h3>
				</Col>
				<CurrentSemester />
			</Row>
		</>
	);
}
