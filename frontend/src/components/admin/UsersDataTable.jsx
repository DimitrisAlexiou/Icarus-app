import { Table, Button, Modal } from 'reactstrap';

const UsersDataTable = () => {
	const users = this.props.users.map((user) => {
		return (
			<tr key={user.id}>
				<th scope="row">{user.id}</th>
				<td>{user.name}</td>
				<td>{user.surname}</td>
				<td>{user.email}</td>
				<td>{user.username}</td>
				<td>
					<div style={{ width: '110px' }}>
						<Modal
							buttonLabel="Edit"
							user={user}
							updateState={this.props.updateState}
						/>{' '}
						<Button color="danger" onClick={() => this.deleteUser(user.id)}>
							Delete
						</Button>
					</div>
				</td>
			</tr>
		);
	});

	return (
		<Table responsive hover>
			<thead>
				<tr>
					<th>ID</th>
					<th>Name</th>
					<th>Surname</th>
					<th>Email</th>
					<th>Username</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>{users}</tbody>
		</Table>
	);
};

export default UsersDataTable;
