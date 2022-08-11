import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { Formik, Form } from 'formik';
import {
	createUserNote,
	getUserNotes,
	reset as notesReset,
} from '../../features/notes/noteSlice';
import { NoteSchema } from '../../schemas/Note';
import { Toast } from '../../constants/sweetAlertNotification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNotes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import noteService from '../../features/notes/noteService';
import NoteForm from '../../components/note/NoteForm';
import NoteItem from '../../components/note/NoteItem';
import Spinner from '../../components/boilerplate/Spinner';

export default function Notes() {
	const { isAuthenticated, isLoading } = useAuth0();

	const {
		notes,
		isLoading: noteIsLoading,
		isSuccess,
		isError,
		message,
	} = useSelector((state) => state.notes);

	const [modalIsOpen, setModalIsOpen] = useState(false);
	const openModal = () => setModalIsOpen(true);
	const closeModal = () => setModalIsOpen(false);

	const initialValues = {
		title: '',
		text: '',
	};

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		return () => {
			if (isSuccess) {
				dispatch(notesReset());
			}
		};
	}, [dispatch, isSuccess]);

	useEffect(() => {
		if (isError) {
			Toast.fire({
				title: 'Error while getting user notes!',
				text: message,
				icon: 'error',
			});
		}
		dispatch(getUserNotes());
	}, [dispatch, isError, message]);

	const onSubmit = async (formNoteData) => {
		try {
			await noteService.createUserNote(formNoteData);
			Toast.fire({
				title: 'Success',
				text: 'Note posted successfully!',
				icon: 'success',
			});
			navigate('/note');
		} catch (error) {
			Toast.fire({
				title: 'Error while posting note!',
				text: error.response.data,
				icon: 'error',
			});
		}
	};

	// const onSubmit = async (formNoteData) => {
	//  formNoteData.preventDefault();
	//     dispatch(createUserNote(formNoteData));
	//     closeModal();
	// };

	if (isLoading || noteIsLoading) {
		return <Spinner />;
	}

	return (
		isAuthenticated && (
			<>
				<Formik
					initialValues={initialValues}
					validationSchema={NoteSchema}
					onSubmit={(formNoteData) => {
						onSubmit(formNoteData);
					}}
					validateOnMount
				>
					<div id="content-wrapper" className="d-flex flex-column">
						<div id="content">
							<h1 className="h3 mb-3 text-gray-800 font-weight-bold">
								Notes !
							</h1>

							<Button
								onClick={openModal}
								className="btn btn-light-cornflower-blue btn-small align-self-center"
							>
								Add Note <FontAwesomeIcon icon={faPlus} />
							</Button>

							<Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
								<ModalHeader className="modal-header" closeButton>
									Fill the form below to post a new note
								</ModalHeader>
								<ModalBody className="modal-body">
									<Form name="newNote">
										<NoteForm initialValues={initialValues} />
									</Form>
								</ModalBody>
								<ModalFooter className="modal-footer">
									<Button className="btn btn-secondary" onClick={closeModal}>
										Close
									</Button>
									<Button
										className="btn btn-light-cornflower-blue btn-small align-self-center"
										type="submit"
									>
										Post
									</Button>
								</ModalFooter>
							</Modal>

							{notes.length ? (
								notes.map((note) => <NoteItem key={note._id} note={note} />)
							) : (
								<div className="container-fluid">
									<div className="text-center">
										<div className="error mx-auto mb-5 mt-5">
											<FontAwesomeIcon icon={faNotes} />
										</div>
										<p className="text-gray-500 mb-4">
											There aren't any notes posted yet !
										</p>
									</div>
								</div>
							)}
						</div>
					</div>
				</Formik>
			</>
		)
	);
}
