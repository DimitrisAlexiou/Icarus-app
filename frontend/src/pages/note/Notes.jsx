import { useEffect, useState, useRef, forwardRef, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, ModalHeader, ModalBody, Button, Row, Col, Badge } from 'reactstrap';
import {
	getUserNotes,
	deleteUserNote,
	deleteUserNotes,
	setEditNote,
} from '../../features/notes/noteSlice';
import { Toast } from '../../constants/sweetAlertNotification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCircleExclamation, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faNoteSticky } from '@fortawesome/free-regular-svg-icons';
import NoteForm from '../../components/note/NoteForm';
import NoteItem from '../../components/note/NoteItem';
import Spinner from '../../components/boilerplate/Spinner';

export default function Notes() {
	const { notes, isLoading } = useSelector((state) => state.notes);
	const { user } = useSelector((state) => state.auth);
	const [mode, setMode] = useState(null);
	const [selectedNote, setSelectedNote] = useState(null);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [showImportant, setShowImportant] = useState(false);
	const myRef = useRef(null);
	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUserNotes());
	}, [dispatch]);

	const ModalComponent = forwardRef(({ note, ...props }, ref) => {
		return (
			<Modal
				ref={ref}
				isOpen={modal}
				toggle={() => {
					setMode(null);
					toggle();
				}}
				className="modal-lg"
			>
				<ModalHeader
					toggle={() => {
						setMode(null);
						toggle();
					}}
				>
					{mode === 'edit' ? 'Edit Note' : 'Fill the form below to post a new note'}
				</ModalHeader>
				<ModalBody>
					<NoteForm
						note={note}
						user={user.user}
						mode={mode}
						modal={modal}
						setModal={setModal}
						setSelectedCategory={setSelectedCategory}
					/>
				</ModalBody>
			</Modal>
		);
	});

	const allCategories = Array.from(new Set(notes.flatMap((note) => note.categories)));

	const filteredNotesByCategory = useMemo(() => {
		if (showImportant) {
			return notes.filter((note) => note.importance);
		}
		return selectedCategory
			? notes.filter((note) => note.categories.includes(selectedCategory))
			: notes;
	}, [notes, selectedCategory, showImportant]);

	const hasImportantNotes = useMemo(() => {
		return notes.some((note) => note.importance);
	}, [notes]);

	const handleNoteDelete = (note) => {
		dispatch(deleteUserNote(note)).then(() => {
			setSelectedCategory(null);
		});
	};

	if (isLoading) return <Spinner />;

	return (
		<>
			<Row className="mb-5 animated--grow-in">
				<Col sm="6" xs="6" md="6">
					<h1 className="h3 mb-3 text-gray-800 font-weight-bold animated--grow-in">
						Notes
					</h1>
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
						Note <FontAwesomeIcon icon={faPlus} beatFade />
					</Button>
				</Col>
			</Row>

			{notes.length > 0 ? (
				<>
					<Col className="animated--grow-in">
						<Col className="nav nav-pills p-2 bg-white mb-3 rounded-pill align-items-center">
							<Badge
								color="primary"
								pill
								style={{ fontSize: '0.8rem' }}
								className={`mx-1 d-flex align-items-center ${
									!selectedCategory ? 'active' : ''
								}`}
								onClick={() => {
									setSelectedCategory(null);
									setShowImportant(false);
								}}
							>
								<span className="d-none d-md-block">All Notes</span>
							</Badge>
							<span className="topbar-divider"></span>
							{allCategories.map((category) => (
								<Badge
									color="info"
									pill
									style={{ fontSize: '0.8rem' }}
									key={category}
									className={`mx-1 d-flex align-items-center ${
										selectedCategory === category ? 'active' : ''
									}`}
									onClick={() => {
										setSelectedCategory(category);
										setShowImportant(false);
									}}
								>
									<span className="d-none d-md-block">{category}</span>
								</Badge>
							))}
							{hasImportantNotes ? (
								<>
									<Badge
										color="warning"
										pill
										style={{ fontSize: '0.8rem' }}
										className={`mx-1 ml-auto d-flex align-items-center ${
											showImportant ? 'active' : ''
										}`}
										onClick={() => {
											setSelectedCategory(null);
											setShowImportant(!showImportant);
										}}
									>
										<FontAwesomeIcon icon={faCircleExclamation} bounce />
									</Badge>
									<span className="topbar-divider"></span>
								</>
							) : null}
							<Badge
								color="danger"
								className={`${
									hasImportantNotes
										? 'mx-1'
										: 'mx-1 ml-auto d-flex align-items-center'
								}`}
								onClick={() => dispatch(deleteUserNotes())}
							>
								<FontAwesomeIcon icon={faXmark} />
							</Badge>
						</Col>
					</Col>
				</>
			) : null}

			<ModalComponent ref={myRef} mode={mode} toggle={toggle} note={selectedNote} />

			{filteredNotesByCategory.length ? (
				<Row className="animated--grow-in">
					{filteredNotesByCategory.map((note) => (
						<Col
							key={note._id}
							xs="12"
							sm="12"
							md="6"
							lg="3"
							xl="3"
							onClick={() => {
								dispatch(
									setEditNote({
										editNoteId: note._id,
										note,
									})
								);
								setSelectedNote(note);
								setMode('edit');
								toggle();
								console.log(note);
							}}
						>
							<NoteItem
								note={note}
								onDelete={(e) => {
									e.stopPropagation();
									handleNoteDelete(note._id);
								}}
							/>
						</Col>
					))}
				</Row>
			) : (
				<div className="animated--grow-in">
					<div className="text-center mt-5">
						<i className="fa-3x mx-auto mb-5 mt-5">
							<FontAwesomeIcon icon={faNoteSticky} />
						</i>
						<p className="text-gray-500 mt-5 mb-5">
							There aren't any notes posted yet !
						</p>
					</div>
				</div>
			)}
		</>
	);
}
