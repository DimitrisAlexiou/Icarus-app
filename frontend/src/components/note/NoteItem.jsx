import { useDispatch } from 'react-redux';
import { Row, Col, Card } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';
import { faCircle, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { updateImportance } from '../../features/notes/noteSlice';

export default function NoteItem({ note, onDelete }) {
	const dispatch = useDispatch();

	return (
		<>
			<div className="note-has-grid mb-4">
				<div className="single-note-item all-category">
					<Card className="card-note card-body-note mb-4">
						<span className="side-stick"></span>
						<h5>{note.title}</h5>
						{/* <p>
							{note.categories.filter(Boolean).length > 0 && (
								<>
									{note.categories.map((category, index) => (
										<b key={index}>{category}</b>
									))}
								</>
							)}
						</p> */}
						<h6
							className="mt-2"
							style={{
								textAlign: 'justify',
								fontWeight: '600',
								fontSize: 12,
							}}
						>
							{new Date(note.postDate)
								.toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'long',
									day: '2-digit',
								})
								.replace(/(\d+)\/(\d+)\/(\d+)/, '$2/$1/$3')}
						</h6>
						<p className="mx-2 py-1">{note.text}</p>
						<Row className="d-flex align-items-center">
							<Col>
								{note.importance ? (
									<span className="mr-3">
										<FontAwesomeIcon
											className="text-warning"
											icon={faExclamation}
											onClick={(e) => {
												e.stopPropagation();
												dispatch(updateImportance(note._id));
											}}
											bounce
										/>
									</span>
								) : (
									<span className="mr-3">
										<FontAwesomeIcon
											icon={faExclamation}
											onClick={(e) => {
												e.stopPropagation();
												dispatch(updateImportance(note._id));
											}}
										/>
									</span>
								)}
								<span className="mr-3">
									<FontAwesomeIcon icon={faTrashAlt} onClick={onDelete} />
								</span>
							</Col>
							{note.categories.filter(Boolean).length > 0 && (
								<Col className="d-flex justify-content-end">
									{note.categories.map((category, index) => (
										<FontAwesomeIcon
											key={index}
											icon={faCircle}
											beatFade
											size="xs"
											className="point ml-2"
										/>
									))}
								</Col>
							)}
						</Row>
					</Card>
				</div>
			</div>
		</>
	);
}
