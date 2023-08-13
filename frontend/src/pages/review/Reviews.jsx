import { Link } from 'react-router-dom';
import { Card, CardText, CardTitle, Row, Col } from 'reactstrap';
import TeachingReviews from './TeachingReviews';
import InstructorReviews from './InstructorReviews';
import GeneralReviews from './GeneralReviews';

export default function Reviews() {
	return (
		<>
			<h3 className="mb-5 text-gray-800 font-weight-bold animated--grow-in">Reviews</h3>

			<Row className="mb-5 justify-content-center animated--grow-in">
				<Col md="7" lg="4" className="mb-3">
					<Link style={{ textDecoration: 'none' }} to="/review/teaching">
						<Card className="card-animate" body color="primary" inverse>
							<CardTitle tag="h5">Teaching</CardTitle>
							<CardText>Teaching implementation.</CardText>
						</Card>
					</Link>
				</Col>
				<Col md="7" lg="4" className="mb-3">
					<Link style={{ textDecoration: 'none' }} to="/review/instructor">
						<Card className="card-animate" body color="info" inverse>
							<CardTitle tag="h5">Instructor</CardTitle>
							<CardText>Instructor of the course.</CardText>
						</Card>
					</Link>
				</Col>
				<Col md="7" lg="4" className="mb-3">
					<Link style={{ textDecoration: 'none' }} to="/review/general">
						<Card className="card-animate" body color="success" inverse>
							<CardTitle tag="h5">General</CardTitle>
							<CardText>General aspects of the course.</CardText>
						</Card>
					</Link>
				</Col>
			</Row>

			<Row className="mb-5"></Row>

			<TeachingReviews />

			<InstructorReviews />

			<GeneralReviews />
		</>
	);
}
