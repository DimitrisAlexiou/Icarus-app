import { useState, forwardRef, useRef } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import useUsers from '../../../hooks/admin/useUsers';
import DataTable from '../../../components/DataTable';
import Switch from 'react-switch';
import UserForm from '../../../components/admin/forms/UserForm';
import RegisterForm from '../../../components/auth/RegisterForm';
import CustomSpinner from '../../../components/boilerplate/spinners/Spinner';
import SpinnerComponent from '../../../components/boilerplate/spinners/SpinnerMessage';
import { faUserPlus, faUserXmark } from '@fortawesome/free-solid-svg-icons';

export default function Users() {
	const {
		users,
		isLoading,
		isEditingUser,
		editUserId,
		setEditUser,
		handleSwitchToggle,
		handleDeleteUser,
		handleDeleteUsers,
		dispatch,
	} = useUsers();

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
		return (
			<Modal ref={ref} isOpen={modal} toggle={toggle} className="modal-lg">
				<ModalHeader toggle={toggle}>
					Edit User (
					<span style={{ fontWeight: 'bold', fontSize: '21px' }}>
						{currentUser.username}
					</span>
					)
				</ModalHeader>
				<ModalBody>
					<UserForm
						user={currentUser}
						setModal={setModal}
						isEditingUser={isEditingUser}
						editUserId={editUserId}
						dispatch={dispatch}
					/>
				</ModalBody>
			</Modal>
		);
	});

	const NewUserComponent = forwardRef((props, ref) => {
		return (
			<Modal
				ref={ref}
				isOpen={newUser}
				toggle={toggleNewUser}
				className="modal-lg"
			>
				<ModalHeader toggle={toggleNewUser}>New User</ModalHeader>
				<ModalBody>
					<RegisterForm
						newUser={newUser}
						setNewUser={setNewUser}
						dispatch={dispatch}
					/>
				</ModalBody>
			</Modal>
		);
	});

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
					onChange={(checked) => handleSwitchToggle(user._id, checked)}
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
							onClick={() => handleDeleteUser(user)}
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
			<Row className="mb-4 animated--grow-in">
				<Col xs="7" sm="7" md="9" lg="9" xl="10">
					<h3 className="text-gray-800 font-weight-bold">Users</h3>
				</Col>
				<Col xs="auto" className="text-right">
					<Row>
						<Col>
							<Button
								onClick={() => {
									setNewUser(true);
								}}
								color="null"
								className="btn btn-success align-self-center"
							>
								<FontAwesomeIcon icon={faUserPlus} />
							</Button>
						</Col>
						{users ? (
							<Col>
								<Button
									className="btn btn-red align-self-center"
									color="null"
									onClick={() => handleDeleteUsers()}
								>
									<FontAwesomeIcon icon={faUserXmark} />
								</Button>
							</Col>
						) : null}
					</Row>
				</Col>
			</Row>

			{isLoading ? (
				<CustomSpinner card />
			) : users.length > 0 ? (
				<Row className="justify-content-center animated--grow-in">
					<Col
						className="card card-body mb-4"
						xs="12"
						sm="12"
						md="12"
						lg="12"
						xl="12"
					>
						<DataTable
							data={users}
							config={dataTableConfig}
							sortColumns={['username', 'name', 'surname']}
							searchMessage={'by Username or Surname'}
						/>
					</Col>
				</Row>
			) : (
				<Row className="justify-content-center animated--grow-in mb-3">
					<Col>
						<div className="profile_card">
							<div className="card-body">
								<div className="align-items-center text-center">
									<SpinnerComponent message="There are no users registered in the system." />
								</div>
							</div>
						</div>
					</Col>
				</Row>
			)}

			{isEditingUser ? <ModalComponent ref={modalRef} toggle={toggle} /> : null}
			<NewUserComponent ref={newUserRef} toggleNewUser={toggleNewUser} />
		</>
	);
}
