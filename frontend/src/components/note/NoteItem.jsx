import { Row, Col, Card } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';
import { faCircle, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import {
	deleteUserNote,
	updateImportance,
} from '../../features/notes/noteSlice';
import moment from 'moment';

export default function NoteItem({ note, setSelectedCategory, dispatch }) {
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
										e.stopPropagation();
										dispatch(updateImportance(note._id));
									}}
									bounce={note.importance}
								/>
							</Col>
							<Col xs="1" sm="1" md="1">
								<FontAwesomeIcon
									className="mr-3 clickable"
									icon={faTrashAlt}
									onClick={(e) => {
										e.stopPropagation();
										dispatch(deleteUserNote(note._id));
										setSelectedCategory(null);
									}}
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
