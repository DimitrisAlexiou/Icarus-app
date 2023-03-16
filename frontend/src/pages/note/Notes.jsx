import { useEffect, useState, useRef, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, ModalHeader, ModalBody, Button, Row, Col } from 'reactstrap';
import { Formik } from 'formik';
import { createUserNote, getUserNotes, reset as notesReset } from '../../features/notes/noteSlice';
import { NoteSchema } from '../../schemas/Note';
import { Toast } from '../../constants/sweetAlertNotification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNoteSticky, faPlus } from '@fortawesome/free-solid-svg-icons';
import NoteForm from '../../components/note/NoteForm';
import NoteItem from '../../components/note/NoteItem';
import Spinner from '../../components/boilerplate/Spinner';

export default function Notes() {
	const { notes, isLoading, isSuccess, isError, message } = useSelector((state) => state.notes);

	const myRef = useRef(null);
	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		return () => {
			if (isSuccess) {
				dispatch(notesReset());
			}
		};
	}, [dispatch, isSuccess]);

	// useEffect(() => {
	// 	if (isError) {
	// 		Toast.fire({
	// 			title: 'Something went wrong!',
	// 			text: message,
	// 			icon: 'error',
	// 		});
	// 	}
	// 	dispatch(getUserNotes());
	// }, [dispatch, isError, message]);

	const ModalComponent = forwardRef((props, ref) => {
		return (
			<Modal ref={ref} isOpen={modal} toggle={toggle} className="modal-lg">
				<ModalHeader>Fill the form below to post a new note</ModalHeader>
				<ModalBody>
					<Formik
						initialValues={{
							title: '',
							text: '',
						}}
						validationSchema={NoteSchema}
						onSubmit={(values, { setSubmitting }) => {
							const note = {
								title: values.title,
								text: values.text,
							};
							console.log(note);
							dispatch(createUserNote(note));
							setSubmitting(false);
							navigate('/note');
						}}
						validateOnMount
					>
						{({ isSubmitting, dirty, handleReset }) => (
							<NoteForm
								isSubmitting={isSubmitting}
								dirty={dirty}
								handleReset={handleReset}
							/>
						)}
					</Formik>
				</ModalBody>
			</Modal>
		);
	});

	if (isLoading) {
		return <Spinner />;
	}

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
						onClick={() => setModal(true)}
						color="null"
						className="btn btn-light-cornflower-blue align-self-center"
					>
						Note <FontAwesomeIcon icon={faPlus} />
					</Button>
				</Col>
			</Row>

			<ModalComponent ref={myRef} />

			{notes.length ? (
				notes.map((note, index) => <NoteItem key={index} note={note} />)
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
