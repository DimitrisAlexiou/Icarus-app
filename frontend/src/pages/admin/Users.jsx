import { useEffect, useState, forwardRef, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import {
	getUsers,
	deleteUser,
	deleteUsers,
	activateUser,
	deActivateUser,
	resetUsers,
	setEditUser,
} from '../../features/admin/userSlice';
import { deleteAlert } from '../../constants/sweetAlertNotification';
import DataTable from '../../components/DataTable';
import Switch from 'react-switch';
import UserForm from '../../components/admin/UserForm';
import RegisterForm from '../../components/auth/RegisterForm';
import CustomSpinner from '../../components/boilerplate/Spinner';

export default function Users() {
	const { users, isLoading, isEditingUser, editUserId } = useSelector((state) => state.users);

	const modalRef = useRef(null);
	const newUserRef = useRef(null);
	const [modal, setModal] = useState(false);
	const [newUser, setNewUser] = useState(false);
	const [currentUser, setCurrentUser] = useState({
		username: '',
		name: '',
		surname: '',
		email: '',
		type: '',
		isAdmin: false,
	});

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUsers());
		dispatch(resetUsers());
	}, [dispatch]);

	const handleSwitchToggle = (userId, checked) => {
		if (checked) {
			dispatch(activateUser(userId));
		} else {
			dispatch(deActivateUser(userId));
		}
	};

	const toggle = () => {
		setModal(!modal);
		dispatch(
			setEditUser({
				isEditingUser: false,
				editUserId: '',
			})
		);
	};
	const toggleNewUser = () => setNewUser(!newUser);

	const ModalComponent = forwardRef((props, ref) => {
		const { modalRef } = props;

		return (
			<Modal modalRef={modalRef} isOpen={modal} toggle={toggle} className="modal-lg">
				<ModalHeader toggle={toggle}>Edit User ({currentUser.username})</ModalHeader>
				<ModalBody>
					<UserForm
						user={currentUser}
						setModal={setModal}
						isEditingUser={isEditingUser}
						editUserId={editUserId}
					/>
				</ModalBody>
			</Modal>
		);
	});

	const NewUserComponent = forwardRef((props, ref) => {
		return (
			<Modal ref={newUserRef} isOpen={newUser} toggle={toggleNewUser} className="modal-lg">
				<ModalHeader toggle={toggleNewUser}>New User</ModalHeader>
				<ModalBody>
					<RegisterForm />
				</ModalBody>
			</Modal>
		);
	});

	if (isLoading) return <CustomSpinner />;

	const dataTableConfig = [
		{
			name: 'username',
			label: 'Username',
			render: (user) => user.username,
		},
		{
			name: 'name',
			label: 'Name',
			render: (user) => user.name,
		},
		{
			name: 'surname',
			label: 'Surname',
			render: (user) => user.surname,
		},
		{
			name: 'email',
			label: 'Email',
			render: (user) => user.email,
		},
		{
			name: 'type',
			label: 'Type',
			render: (user) => user.type,
		},
		{
			name: 'isActive',
			label: 'Active',
			render: (user) => (
				<Switch
					onChange={(checked) => {
						handleSwitchToggle(user._id, checked);
					}}
					checked={user.isActive}
					uncheckedIcon={false}
					checkedIcon={false}
					onColor="#3ea37d"
					offColor="#bfcbd9"
				/>
			),
		},
		{
			name: 'actions',
			label: 'Actions',
			render: (user) => (
				<Row style={{ width: '150px' }}>
					<Col xs="6" sm="4" className="mb-2">
						<Button
							className="btn btn-light"
							onClick={() => {
								dispatch(setEditUser({ editUserId: user._id }));
								setCurrentUser(user);
								setModal(true);
							}}
						>
							<FontAwesomeIcon icon={faEdit} />
						</Button>
					</Col>
					<Col sm="4">
						<Button
							className="btn btn-light"
							onClick={() => {
								// doDeleteUser(user);
								deleteAlert(dispatch(deleteUser(user._id)));
							}}
						>
							<FontAwesomeIcon icon={faTrashAlt} />
						</Button>
					</Col>
				</Row>
			),
		},
	];

	return (
		<>
			<Row className="mb-5 animated--grow-in">
				<Col xs="12" sm="12" md="5" lg="7" xl="8">
					<h3 className="text-gray-800 font-weight-bold">Users</h3>
				</Col>
				<Col xs="6" sm="6" md="3" lg="2" xl="2" className="text-sm-left text-center">
					<Button
						onClick={() => {
							setNewUser(true);
						}}
						color="null"
						className="btn btn-orange align-self-center"
					>
						Add User
					</Button>
				</Col>
				{users ? (
					<Col xs="6" sm="6" md="4" lg="3" xl="2" className="text-sm-right text-center">
						<Button
							className="btn btn-red align-self-center"
							color="null"
							onClick={() => deleteAlert(dispatch(deleteUsers()))}
							// onClick={() => dispatch(deleteUsers())}
						>
							<FontAwesomeIcon icon={faTrashAlt} /> Delete Users
						</Button>
					</Col>
				) : null}
			</Row>

			<Row className="justify-content-center animated--grow-in">
				<Col className="card card-body mb-4" xs="12" sm="12" md="12" lg="12" xl="12">
					<DataTable
						data={users}
						config={dataTableConfig}
						sortColumns={['username', 'name', 'surname']}
						searchMessage={'by Username or Surname'}
					/>
				</Col>
			</Row>

			{isEditingUser ? <ModalComponent modalRef={modalRef} toggle={toggle} /> : null}
			<NewUserComponent ref={newUserRef} toggleNewUser={toggleNewUser} />
		</>
	);
}
