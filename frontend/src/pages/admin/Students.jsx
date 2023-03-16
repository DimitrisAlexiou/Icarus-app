import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import Spinner from '../../components/boilerplate/Spinner';

export default function Users() {
	const navigate = useNavigate();

	// if (isLoading) {
	// 	return <Spinner />;
	// }

	return (
		<>
			<h1 className="h3 mb-5 text-gray-800 font-weight-bold animated--grow-in">Students</h1>

			<Row className="justify-content-center animated--grow-in">
				<Col sm="12" md="11" lg="10" xl="8"></Col>
			</Row>
		</>
	);
}
