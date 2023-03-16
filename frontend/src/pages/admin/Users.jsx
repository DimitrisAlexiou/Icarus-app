import { useEffect, useState, forwardRef, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
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
	Input,
} from 'reactstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faCheck } from '@fortawesome/free-solid-svg-icons';
import {
	getUsers,
	updateUser,
	deleteUser,
	activateUser,
	reset,
} from '../../features/admin/userSlice';
import { Toast } from '../../constants/sweetAlertNotification';
import SubmitButton from '../../components/buttons/SubmitButton';
import FormErrorMessage from '../../components/FormErrorMessage';
import Spinner from '../../components/boilerplate/Spinner';

export default function Users() {
	const { users, isLoading } = useSelector((state) => state.users);

	const [isMounted, setIsMounted] = useState(true);
	const myRef = useRef(null);

	const [searchQuery, setSearchQuery] = useState('');
	const [sortColumn, setSortColumn] = useState('username');
	const [sortOrder, setSortOrder] = useState('asc');
	const [modal, setModal] = useState(false);

	const [currentUser, setCurrentUser] = useState({
		username: '',
		name: '',
		surname: '',
		email: '',
		type: '',
		isAdmin: false,
	});

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getUsers());
		dispatch(reset());
	}, [dispatch]);

	useEffect(() => {
		return () => {
			setIsMounted(false);
		};
	}, []);

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

	// const update = () => {
	// 	if (isMounted) {
	// 		dispatch(updateUser(currentUser));
	// 		setModal(false);
	// 	}
	// };

	// const update = async () => {
	// 	await axios.put(`http://localhost:3000/api/admin/users/${currentUser._id}`, currentUser);
	// };

	const handleSearchQueryChange = (e) => {
		setSearchQuery(e.target.value);
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

	const filteredUsers = sortedUsers.filter((user) => {
		const matchUsername = user.username.toLowerCase().includes(searchQuery.toLowerCase());
		const matchSurname = user.surname.toLowerCase().includes(searchQuery.toLowerCase());
		return matchUsername || matchSurname;
	});

	const usersFound = filteredUsers.map((user) => {
		return (
			<tr key={user._id}>
				<th scope="row" onClick={() => handleSort('username')}>
					{user.username}
				</th>
				<td onClick={() => handleSort('name')}>{user.name}</td>
				<td onClick={() => handleSort('surname')}>{user.surname}</td>
				<td>{user.email}</td>
				<td>{user.type}</td>
				<td>{user.isActive ? 'Active' : 'Inactive'}</td>
				<td>
					<Row style={{ width: '150px' }}>
						{!user.isActive ? (
							<>
								<Col xs="6" sm="4" className="mb-2">
									<Button
										className="btn btn-light"
										onClick={() => activate(user)}
									>
										<FontAwesomeIcon icon={faCheck} />
									</Button>
								</Col>
							</>
						) : null}
						<Col xs="6" sm="4" className="mb-2">
							<Button className="btn btn-light" onClick={() => edit(user)}>
								<FontAwesomeIcon icon={faEdit} />
							</Button>
						</Col>
						<Col sm="4">
							<Button className="btn btn-light" onClick={() => deleteU(user)}>
								<FontAwesomeIcon icon={faTrashAlt} />
							</Button>
						</Col>
					</Row>
				</td>
			</tr>
		);
	});

	const ModalComponent = forwardRef((props, ref) => {
		return (
			<Modal ref={ref} isOpen={modal} toggle={toggle} className="modal-lg">
				<ModalHeader toggle={toggle}>Edit User ({currentUser.username})</ModalHeader>
				<ModalBody>
					<Formik
						initialValues={{
							username: '',
							name: '',
							surname: '',
							email: '',
							type: '',
							isAdmin: false,
						}}
						onSubmit={(values, { setSubmitting }) => {
							const user = {
								username: values.username,
								name: values.name,
								surname: values.surname,
								email: values.email,
								type: values.type,
								isAdmin: values.isAdmin,
							};
							if (isMounted) {
								dispatch(updateUser(user));
								dispatch(reset());
								setModal(false);
								setSubmitting(false);
								setIsMounted(false);
								navigate('/users');
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
									<Col md="7">
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
		);
	});

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<Row className="mb-5 animated--grow-in">
				<Col>
					<h1 className="h3 text-gray-800 font-weight-bold">Users</h1>
				</Col>
				<Col className="d-flex justify-content-end">
					<Link to="/user" className="btn btn-orange align-self-center">
						Add User
					</Link>
				</Col>
			</Row>
			<Row className="animated--grow-in">
				<Col className="d-flex justify-content-end mb-3">
					<Button className="btn btn-red align-self-center" color="null">
						Delete Users
					</Button>
				</Col>
			</Row>
			<Row className="justify-content-center animated--grow-in">
				<Col className="card card-body mb-4" xs="12" sm="12" md="12" lg="12" xl="12">
					<Input
						type="text"
						placeholder="Search by username or surname . . ."
						value={searchQuery}
						onChange={handleSearchQueryChange}
					/>
					<Table className="mt-3" responsive hover>
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
				</Col>
			</Row>
			<ModalComponent ref={myRef} />
		</>
	);
}
