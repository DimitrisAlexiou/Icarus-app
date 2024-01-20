import moment from 'moment';
import { Row, Col, Card } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';
import { faCircle, faTrashAlt } from '@fortawesome/free-regular-svg-icons';

export default function NoteItem({
	note,
	setSelectedCategory,
	handleUpdateImportance,
	handleDeleteUserNote,
}) {
	return (
		<>
			<div className="note-has-grid mb-4">
				<div className="single-note-item all-category">
					<Card className="card-note card-body-note mb-4 clickable-no-padding">
						<span className="side-stick"></span>
						<h5>{note.title}</h5>
						<p className="mx-2 py-1">{note.text}</p>
						<h6
							className="mt-2"
							style={{
								textAlign: 'justify',
								fontWeight: '600',
								fontSize: 12,
							}}
						>
							Created at: {moment(note.createdAt).format('MMMM DD, YYYY')}
						</h6>
						<Row className="d-flex align-items-center">
							<Col xs="1" sm="1" md="1">
								<FontAwesomeIcon
									className={
										note.importance
											? 'text-warning mr-3 clickable'
											: 'mr-3 clickable'
									}
									icon={faExclamation}
									onClick={(e) => {
										handleUpdateImportance(e, note._id);
									}}
									bounce={note.importance}
								/>
							</Col>
							<Col xs="1" sm="1" md="1">
								<FontAwesomeIcon
									className="mr-3 clickable"
									icon={faTrashAlt}
									onClick={(e) =>
										handleDeleteUserNote(e, note._id, setSelectedCategory)
									}
								/>
							</Col>
							{note.categories.filter(Boolean).length > 0 ? (
								<Col className="d-flex justify-content-end">
									{note.categories.map((index) => (
										<FontAwesomeIcon
											key={index}
											icon={faCircle}
											beatFade
											size="xs"
											className="point ml-2"
										/>
									))}
								</Col>
							) : null}
						</Row>
					</Card>
				</div>
			</div>
		</>
	);
}
