import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Col, Row } from 'reactstrap';
import { getUsers, reset } from '../../features/admin/userSlice';
import UsersDataTable from '../../components/admin/UsersDataTable';
import Spinner from '../../components/boilerplate/Spinner';

export default function Users() {
	const { users, isLoading } = useSelector((state) => state.users);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUsers());
		dispatch(reset());
	}, [dispatch]);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<Row className="mb-5">
				<Col>
					<h1 className="h3 text-gray-800 font-weight-bold">Users</h1>
				</Col>
				<Col className="d-flex justify-content-end">
					<Link to="/user" className="btn btn-orange btn-small align-self-center">
						Add User
					</Link>
				</Col>
			</Row>
			<Row>
				<Col className="d-flex justify-content-end mb-3">
					<Button className="btn btn-red btn-small align-self-center" color="null">
						Delete Users
					</Button>
				</Col>
			</Row>

			<Row className="justify-content-center">
				<Col xs="12" sm="12" md="12" lg="12" xl="12">
					<UsersDataTable users={users} />
				</Col>
			</Row>
		</>
	);
}
