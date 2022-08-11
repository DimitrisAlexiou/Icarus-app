import { Row, Col } from 'reactstrap';

export default function NoteItem({ note }) {
	return (
		<>
			<div className="card border-left-sky-blue-crayola">
				<div className="card-header py-3">
					<Row className="col-sm-14">
						<Col>
							<h5 className="text-cerulean-crayola">{note.title}</h5>
						</Col>
						<Col className="col-md-4 col-lg-4 col-xl-4 d-flex justify-content-end py-1">
							<h6 className="text-light-cornflower-blue">
								{new Date(note.createdAt).toLocalString('el')}
							</h6>
						</Col>
					</Row>
				</div>

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
