import { useState, useRef, forwardRef, useMemo } from 'react';
import {
	Modal,
	ModalHeader,
	ModalBody,
	Button,
	Row,
	Col,
	Badge,
	NavItem,
	NavLink,
	Spinner,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCircleExclamation,
	faPlus,
	faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { faNoteSticky } from '@fortawesome/free-regular-svg-icons';
import useNotes from '../../hooks/note/useNotes';
import NoteForm from '../../components/note/NoteForm';
import NoteItem from '../../components/note/NoteItem';
import Loading from '../../components/boilerplate/spinners/Spinner';
import PillHeader from '../../components/boilerplate/headers/PillHeader';
import UserNotes from '../../components/admin/UserNotes';

export default function Notes() {
	const {
		user,
		notes,
		isLoading,
		isEditingNote,
		editNoteId,
		setEditNote,
		allCategories,
		hasImportantNotes,
		handleUpdateImportance,
		handleDeleteUserNote,
		handleDeleteUserNotes,
		dispatch,
	} = useNotes();

	const [selectedNote, setSelectedNote] = useState(null);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [showImportant, setShowImportant] = useState(false);

	const myRef = useRef(null);
	const [modal, setModal] = useState(false);

	const toggle = () => {
		setModal(!modal);
		dispatch(
			setEditNote({
				isEditingNote: false,
				editNoteId: '',
			})
		);
	};

	const ModalComponent = forwardRef(({ note, ...props }, ref) => {
		return (
			<Modal ref={ref} isOpen={modal} toggle={toggle} className="modal-lg">
				<ModalHeader toggle={toggle}>
					{isEditingNote
						? 'Edit Note'
						: 'Fill the form below to post a new note'}
				</ModalHeader>
				<ModalBody>
					<NoteForm
						note={note}
						user={user}
						isEditingNote={isEditingNote}
						editNoteId={editNoteId}
						setSelectedCategory={setSelectedCategory}
						setModal={setModal}
						dispatch={dispatch}
					/>
				</ModalBody>
			</Modal>
		);
	});

	const filteredNotesByCategory = useMemo(() => {
		if (showImportant) return notes.filter((note) => note.importance);

		return selectedCategory
			? notes.filter((note) => note.categories.includes(selectedCategory))
			: notes;
	}, [notes, selectedCategory, showImportant]);

	return (
		<>
			<Row className="mb-4 animated--grow-in">
				<Col sm="6" xs="6" md="6">
					<h3 className="mb-3 text-gray-800 font-weight-bold animated--grow-in">
						Notes
					</h3>
				</Col>
				<Col className="px-3 d-flex justify-content-end">
					<Button
						onClick={() => {
							setSelectedNote(null);
							setModal(true);
						}}
						color="null"
						className="btn btn-light-cornflower-blue align-self-center"
					>
						<FontAwesomeIcon icon={faPlus} />
					</Button>
				</Col>
			</Row>

			{notes.length > 0 ? (
				<Row className="animated--grow-in">
					<Col
						md="8"
						lg="9"
						xl="10"
						className="nav nav-pills p-2 bg-white mb-3 rounded-pill align-items-center"
					>
						<NavItem className="nav-item mx-1">
							<NavLink
								style={{ fontSize: '0.9rem' }}
								className={`mx-1 d-flex align-items-center nav-link ${
									selectedCategory === null && !showImportant
										? 'font-weight-bold text-gray-600 clickable'
										: 'text-gray-500 clickable'
								}`}
								onClick={() => {
									setSelectedCategory(null);
									setShowImportant(false);
								}}
							>
								Notes
								<span
									className="text-muted pill-label mx-2"
									style={{
										fontWeight: '900',
										fontSize: '0.6rem',
									}}
								>
									{notes.length}
								</span>
							</NavLink>
						</NavItem>
						<span className="topbar-divider"></span>
						{allCategories.map((category) => (
							<NavItem key={category} className="nav-item mx-1">
								<NavLink
									style={{ fontSize: '0.9rem' }}
									className={`nav-link ${
										selectedCategory === category
											? 'font-weight-bold text-gray-600 clickable'
											: 'text-gray-500 clickable'
									}`}
									onClick={() => {
										setSelectedCategory(category);
										setShowImportant(false);
									}}
								>
									{category}
								</NavLink>
							</NavItem>
						))}
					</Col>
					<Col className="nav nav-pills p-2 bg-white mb-3 rounded-pill d-flex justify-content-center mx-4">
						{hasImportantNotes ? (
							<>
								<Badge
									color="warning"
									pill
									style={{ fontSize: '0.9rem' }}
									className={`mx-1 ml-auto d-flex align-items-center`}
									onClick={() => {
										setSelectedCategory(null);
										setShowImportant(!showImportant);
									}}
								>
									<FontAwesomeIcon
										className="clickable"
										icon={faCircleExclamation}
										bounce
									/>
								</Badge>
								<span className="topbar-divider"></span>
							</>
						) : null}
						<Badge
							color="danger"
							pill
							style={{ fontSize: '0.9rem' }}
							className={`mx-1 d-flex align-items-center`}
							onClick={() => handleDeleteUserNotes()}
						>
							{isLoading ? (
								<Spinner size="sm" color="dark" type="grow" />
							) : (
								<FontAwesomeIcon className="clickable" icon={faTrashAlt} />
							)}
						</Badge>
					</Col>
				</Row>
			) : null}

			<ModalComponent
				ref={myRef}
				isEditingNote={isEditingNote}
				toggle={toggle}
				note={selectedNote}
			/>

			{user.user.isAdmin ? (
				<Row className="mb-4 justify-content-between animated--grow-in">
					<Col className="text-center">
						<PillHeader title="User Notes" />
						<h6
							className="text-muted pill-label"
							style={{
								fontWeight: '700',
								fontSize: 15,
							}}
						>
							{notes.length}
						</h6>
					</Col>
				</Row>
			) : null}

			{filteredNotesByCategory.length ? (
				isLoading ? (
					<Loading card />
				) : user.user.isAdmin ? (
					<UserNotes
						notes={notes}
						filteredNotesByCategory={filteredNotesByCategory}
						setEditNote={setEditNote}
						setSelectedCategory={setSelectedCategory}
						setSelectedNote={setSelectedNote}
						handleUpdateImportance={handleUpdateImportance}
						handleDeleteUserNote={handleDeleteUserNote}
						setModal={setModal}
						dispatch={dispatch}
					/>
				) : (
					<>
						<Row className="animated--grow-in">
							{filteredNotesByCategory.map((note) => (
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
					</>
				)
			) : (
				<div className="animated--grow-in">
					<div className="text-center mt-5">
						<i className="fa-3x mx-auto mb-5 mt-5">
							<FontAwesomeIcon icon={faNoteSticky} />
						</i>
						<p className="text-gray-500 mt-5 mb-5">
							{user.user.isAdmin
								? 'There are no notes registered in the system.'
								: `There aren't any notes posted yet.`}
						</p>
					</div>
				</div>
			)}
		</>
	);
}
