import {
	Table,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	Row,
	Col,
	FormGroup,
	Label,
} from 'reactstrap';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	getUsers,
	updateUser,
	deleteUser,
	activateUser,
	reset,
} from '../../features/admin/userSlice';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Toast } from '../../constants/sweetAlertNotification';
import SubmitButton from '../../components/buttons/SubmitButton';
import FormErrorMessage from '../FormErrorMessage';
import Spinner from '../../components/boilerplate/Spinner';

export default function UsersDataTable({ users }) {
	const { isLoading, isError, isSuccess, message } = useSelector((state) => state.users);
	const [isMounted, setIsMounted] = useState(true);
	const [sortColumn, setSortColumn] = useState('username');
	const [sortOrder, setSortOrder] = useState('asc');
	const [modal, setModal] = useState(false);
	const [currentUser, setCurrentUser] = useState({
		_id: '',
		username: '',
		name: '',
		surname: '',
		email: '',
		type: '',
		isAdmin: false,
	});

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const toggle = () => setModal(!modal);

	const edit = (user) => {
		setCurrentUser(user);
		setModal(true);
	};

	const deleteU = (user) => {
		dispatch(deleteUser(user._id));
		navigate('/users');
	};

	const activate = (user) => {
		dispatch(activateUser(user._id));
		navigate('/users');
	};

	const handleSort = (column) => {
		if (sortColumn === column) {
			setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
		} else {
			setSortColumn(column);
			setSortOrder('asc');
		}
	};

	const sortedUsers = [...users].sort((a, b) => {
		if (sortOrder === 'asc') {
			return a[sortColumn].localeCompare(b[sortColumn]);
		}
		return b[sortColumn].localeCompare(a[sortColumn]);
	});

	// useEffect(() => {
	// 	if (isError) {
	// 		Toast.fire({
	// 			title: 'Something went wrong!',
	// 			text: message,
	// 			icon: 'error',
	// 		});
	// 	}
	// 	if (isSuccess) {
	// 		Toast.fire({
	// 			title: 'Success',
	// 			text: 'Action fulfilled!',
	// 			icon: 'success',
	// 		});
	// 		navigate('/users');
	// 	}
	// }, [dispatch, navigate, isError, isSuccess, message]);

	useEffect(() => {
		return () => {
			setIsMounted(false);
		};
	}, []);

	// const update = () => {
	// 	if (isMounted) {
	// 		dispatch(updateUser(currentUser));
	// 		setModal(false);
	// 	}
	// };

	// const update = async () => {
	// 	await axios.put(`http://localhost:3000/api/admin/users/${currentUser._id}`, currentUser);
	// };

	const usersFound = sortedUsers.map((user) => {
		return (
			<tr key={user._id}>
				<th scope="row" onClick={() => handleSort('username')}>
					{user.username}
				</th>
				<td>{user.name}</td>
				<td>{user.surname}</td>
				<td>{user.email}</td>
				<td>{user.type}</td>
				<td>{user.isActive ? 'Active' : 'Inactive'}</td>
				<td>
					<Row style={{ width: '150px' }}>
						{!user.isActive ? (
							<>
								<Col xs="6" sm="4" className="mb-2">
									<Button
										className="btn btn-light btn-small"
										onClick={() => activate(user)}
									>
										<FontAwesomeIcon icon={faCheck} />
									</Button>
								</Col>
								<Col xs="6" sm="4" className="mb-2">
									<Button
										className="btn btn-light btn-small"
										onClick={() => edit(user)}
									>
										<FontAwesomeIcon icon={faEdit} />
									</Button>
								</Col>
								<Col sm="4">
									<Button
										className="btn btn-light btn-small"
										onClick={() => deleteU(user)}
									>
										<FontAwesomeIcon icon={faTrashAlt} />
									</Button>
								</Col>
							</>
						) : (
							<>
								<Col xs="6" sm="4" className="mb-2">
									<Button
										className="btn btn-light btn-small"
										onClick={() => edit(user)}
									>
										<FontAwesomeIcon icon={faEdit} />
									</Button>
								</Col>
								<Col sm="4">
									<Button
										className="btn btn-light btn-small"
										// onClick={() => this.deleteUser(user._id)}
									>
										<FontAwesomeIcon icon={faTrashAlt} />
									</Button>
								</Col>
							</>
						)}
					</Row>
				</td>
			</tr>
		);
	});

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<Table responsive hover>
				<thead>
					<tr>
						<th>Username</th>
						<th>Name</th>
						<th>Surname</th>
						<th>Email</th>
						<th>Type</th>
						<th>Status</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>{usersFound}</tbody>
			</Table>
			<Modal isOpen={modal} toggle={toggle}>
				<ModalHeader toggle={toggle}>Edit User ({currentUser.username})</ModalHeader>
				<ModalBody>
					<Formik
						initialValues={currentUser}
						onSubmit={(values, { setSubmitting }) => {
							const user = {
								user: {
									username: values.username,
									name: values.name,
									surname: values.surname,
									email: values.email,
									type: values.type,
									isAdmin: values.isAdmin,
								},
							};
							if (isMounted) {
								dispatch(updateUser(user));
								dispatch(reset());
								setModal(false);
								setSubmitting(false);
								setIsMounted(false);
								dispatch(getUsers());
							}
						}}
						validateOnMount
					>
						{({ isSubmitting, dirty, handleReset }) => (
							<Form>
								<Row>
									<Col md="5">
										<FormGroup className="form-floating mb-3" floating>
											<Field
												type="text"
												className="form-control"
												name="name"
											/>
											<Label for="name" className="text-gray-600">
												Name
											</Label>
											<ErrorMessage
												name="name"
												component={FormErrorMessage}
											/>
										</FormGroup>
									</Col>
									<Col md="7">
										<FormGroup className="form-floating mb-3" floating>
											<Field
												type="text"
												className="form-control"
												name="surname"
											/>
											<Label for="surname" className="text-gray-600">
												Surname
											</Label>
											<ErrorMessage
												name="surname"
												component={FormErrorMessage}
											/>
										</FormGroup>
									</Col>
								</Row>
								<Row>
									<Col md="5">
										<FormGroup className="form-floating mb-3" floating>
											<Field
												type="text"
												className="form-control"
												name="username"
											/>
											<Label for="username" className="text-gray-600">
												Username
											</Label>
											<ErrorMessage
												name="username"
												component={FormErrorMessage}
											/>
										</FormGroup>
									</Col>
									<Col md="7">
										<FormGroup className="form-group mb-3" floating>
											<Field
												type="email"
												className="form-control"
												name="email"
											/>
											<Label for="email" className="text-gray-600">
												Email
											</Label>
											<ErrorMessage
												name="email"
												component={FormErrorMessage}
											/>
										</FormGroup>
									</Col>
								</Row>
								<Row>
									<Col md="5">
										<FormGroup className="form-floating mb-3" floating>
											<Field
												as="select"
												className="form-control"
												name="isAdmin"
											>
												<option default value={'false'}>
													False
												</option>
												<option value={'true'}>True</option>
											</Field>
											<Label for="isAdmin" className="text-gray-600">
												Admin
											</Label>
											<ErrorMessage
												name="isAdmin"
												component={FormErrorMessage}
											/>
										</FormGroup>
									</Col>
									<Col md="5">
										<FormGroup className="form-floating mb-3" floating>
											<Field as="select" className="form-control" name="type">
												<option default>Select type</option>
												<option value={'Student'}>Student</option>
												<option value={'Instructor'}>Instructor</option>
											</Field>
											<Label for="type" className="text-gray-600">
												Type
											</Label>
											<ErrorMessage
												name="type"
												component={FormErrorMessage}
											/>
										</FormGroup>
									</Col>
								</Row>
								<Row>
									<Col>
										<Button
											onClick={handleReset}
											disabled={!dirty || isSubmitting}
										>
											Clear
										</Button>
									</Col>
									<Col className="text-right px-0">
										<SubmitButton
											// onClick={update}
											color={'primary'}
											message={'Update'}
											disabled={isSubmitting}
										/>
										{/* <Button color="primary" onClick={update}>
											Update
										</Button> */}
									</Col>
								</Row>
							</Form>
						)}
					</Formik>
				</ModalBody>
			</Modal>
		</>
	);
}
