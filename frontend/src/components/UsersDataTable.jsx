import { Table, Button } from 'reactstrap';

const UsersDataTable = () => {
	const items = this.props.items.map((item) => {
		return (
			<tr key={item.id}>
				<th scope="row">{item.id}</th>
				<td>{item.first}</td>
				<td>{item.last}</td>
				<td>{item.email}</td>
				<td>{item.phone}</td>
				<td>{item.location}</td>
				<td>{item.hobby}</td>
				<td>
					{/* <div style={{ width: '110px' }}>
						<ModalForm
							buttonLabel="Edit"
							item={item}
							updateState={this.props.updateState}
						/>{' '}
						<Button color="danger" onClick={() => this.deleteItem(item.id)}>
							Del
						</Button>
					</div> */}
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
					{/* <th>Actions</th> */}
				</tr>
			</thead>
			<tbody>{items}</tbody>
		</Table>
	);
};

export default UsersDataTable;
