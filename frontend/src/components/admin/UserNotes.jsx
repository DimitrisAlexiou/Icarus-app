import { Col, Row } from 'reactstrap';
import { groupBy } from '../../utils/groupBy';
import NoteItem from '../note/NoteItem';

export default function UserNotes({
	notes,
	filteredNotesByCategory,
	handleUpdateImportance,
	handleDeleteUserNote,
	setSelectedCategory,
	setSelectedNote,
	setEditNote,
	setModal,
	dispatch,
}) {
	const userNotesMap = groupBy(notes, (note) => note.owner._id);

	return (
		<>
			{Object.entries(userNotesMap).map(([userId, userNotes]) => (
				<div key={userId}>
					<Row className="mb-2 justify-content-between animated--grow-in">
						<Col className="text-center">
							<h6
								className="text-muted"
								style={{
									fontWeight: '700',
									fontSize: 20,
								}}
							>
								{userNotes[0].owner.name} {userNotes[0].owner.surname}
							</h6>
							<h6
								className="text-muted pill-label"
								style={{
									fontWeight: '700',
									fontSize: 15,
								}}
							>
								{userNotes.length}
							</h6>
						</Col>
					</Row>

					<Row className="animated--grow-in">
						{userNotes.map((note) => (
							<Col
								key={note._id}
								xs="12"
								sm="12"
								md="6"
								lg="4"
								xl="3"
								onClick={() => {
									dispatch(setEditNote({ editNoteId: note._id }));
									setSelectedNote(note);
									setModal(true);
								}}
							>
								<NoteItem
									note={note}
									setSelectedCategory={setSelectedCategory}
									handleUpdateImportance={handleUpdateImportance}
									handleDeleteUserNote={handleDeleteUserNote}
								/>
							</Col>
						))}
					</Row>
				</div>
			))}
		</>
	);
}
