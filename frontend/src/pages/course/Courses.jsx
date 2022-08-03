import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { Card, CardText, CardTitle, Row, Col } from 'reactstrap';
import Spinner from '../../components/boilerplate/Spinner';

export default function Courses() {
	const { isAuthenticated, isLoading } = useAuth0();

	if (isLoading) {
		return <Spinner />;
	}

	return (
		isAuthenticated && (
			<>
				<div id="content-wrapper" className="d-flex flex-column">
					<div id="content">
						<div className="row mb-3">
							<div className="col-6">
								<h1 className="h3 mb-3 text-gray-800 font-weight-bold">
									Courses !
								</h1>
							</div>
							<div className="col-6 mb-3 px-3 d-flex justify-content-end">
								<Link
									to="/course/new"
									className="btn btn-light-cornflower-blue btn-small align-self-center"
								>
									Add Course
								</Link>
							</div>
						</div>

						<div className="row">
							<Row className="justify-content-center">
								<Col className="mb-3" md="7" lg="4">
									<Card body color="primary" inverse>
										<CardTitle tag="h5">Undergraduate</CardTitle>
										<CardText>
											See the undergraduate offered courses program !
										</CardText>
										<Link
											to="/course/undergraduate/all"
											type="button"
											className="btn btn-secondary btn-small align-self-center"
										>
											Learn about
										</Link>
									</Card>
								</Col>
								<Col className="mb-3" md="7" lg="4">
									<Card body color="info" inverse>
										<CardTitle tag="h5">Master</CardTitle>
										<CardText>
											See the master offered courses program !
										</CardText>
										<Link
											to="/course/master/all"
											type="button"
											className="btn btn-secondary btn-small align-self-center"
										>
											Learn about
										</Link>
									</Card>
								</Col>
							</Row>
						</div>
					</div>
				</div>
			</>
		)
	);
}
