import { Table, Button, ModalForm } from 'reactstrap';

const CoursesDataTable = () => {
	const courses = this.props.courses.map((course) => {
		return (
			<tr key={course.cid}>
				<th scope="row">{course.cid}</th>
				<td>{course.title}</td>
				<td>{course.type}</td>
				<td>{course.semester}</td>
				<td>{course.isObligatory}</td>
				<td>{course.hasLab}</td>
				<td>{course.isActive}</td>
				<td>
					<div style={{ width: '110px' }}>
						<ModalForm
							buttonLabel="Activate"
							course={course}
							updateState={this.props.updateState}
						/>{' '}
						<Button color="info" onClick={() => this.editCourse(course.id)}>
							Edit
						</Button>
						<Button color="danger" onClick={() => this.deleteCourse(course.id)}>
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
					<th>Title</th>
					<th>Type</th>
					<th>Semester</th>
					<th>Obligatory</th>
					<th>Lab</th>
					<th>Active</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>{courses}</tbody>
		</Table>
	);
};

export default CoursesDataTable;
