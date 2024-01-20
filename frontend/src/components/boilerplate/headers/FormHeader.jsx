import { Col, Row } from 'reactstrap';

export default function FormHeader({ title }) {
	return (
		<>
			<div className="card-header py-3">
				<Row className="align-items-center">
					<Col>
						<h6 className="m-0 font-weight-bold text-primary">{title}</h6>
					</Col>
				</Row>
			</div>
		</>
	);
}
