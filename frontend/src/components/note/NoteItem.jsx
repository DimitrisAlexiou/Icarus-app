import { Row, Col } from 'reactstrap';

export default function NoteItem({ note }) {
	return (
		<>
			<div className="card border-left-sky-blue-crayola">
				<Row className="card-header py-3">
					<Row>
						<Col sm="14">
							<h5 className="text-cerulean-crayola">{note.title}</h5>
						</Col>
						<Col md="4" lg="4" xl="4" className="d-flex justify-content-end py-1">
							<h6 className="text-light-cornflower-blue">
								{new Date(note.createdAt).toLocalString('el')}
							</h6>
						</Col>
					</Row>
				</Row>

				<div className="card-body">
					<p
						className="card-text"
						style={{
							textAlign: 'justify',
							fontWeight: '600',
							fontSize: 12,
						}}
					>
						{note.text}
					</p>
				</div>
			</div>
		</>
	);
}
