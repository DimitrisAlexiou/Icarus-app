import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { Card, CardText, CardTitle, Row, Col } from 'reactstrap';
import Spinner from '../../components/boilerplate/Spinner';

export default function Courses() {
	// const { isAuthenticated, isLoading } = useAuth0();

	// if (isLoading) {
	// 	return <Spinner />;
	// }

	return (
		// isAuthenticated && (
		<>
			<Row className="mb-5">
				<Col>
					<h1 className="h3 text-gray-800 font-weight-bold">Courses !</h1>
				</Col>
				<Col className="px-3 d-flex justify-content-end">
					<Link
						to="/course/new"
						className="btn btn-light-cornflower-blue btn-small align-self-center"
					>
						Add Course
					</Link>
				</Col>
			</Row>

			<Row className="justify-content-center">
				<Col md="7" lg="4">
					<Card body color="primary" className="mb-5" inverse>
						<CardTitle tag="h5">Undergraduate</CardTitle>
						<CardText>Undergraduate offered courses program !</CardText>
						<Link
							to="/course/undergraduate"
							type="button"
							className="btn btn-secondary btn-small align-self-center"
						>
							Learn about
						</Link>
					</Card>
				</Col>
				<Col md="7" lg="4">
					<Card body color="info" inverse>
						<CardTitle tag="h5">Master</CardTitle>
						<CardText>Master offered courses program !</CardText>
						<Link
							to="/course/master"
							type="button"
							className="btn btn-secondary btn-small align-self-center"
						>
							Learn about
						</Link>
					</Card>
				</Col>
			</Row>
		</>
		// )
	);
}
