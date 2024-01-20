import { Col, Row } from 'reactstrap';

export default function Header({ title }) {
	return (
		<>
			<Row className="mb-3 animated--grow-in">
				<Col>
					<h3 className="text-gray-800 font-weight-bold">{title}</h3>
				</Col>
			</Row>
		</>
	);
}
