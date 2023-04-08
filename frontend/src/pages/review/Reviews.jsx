import { Link } from 'react-router-dom';
import { Button, Card, CardText, CardTitle, Row, Col } from 'reactstrap';

export default function Reviews() {
	return (
		<>
			<h1 className="h3 mb-5 text-gray-800 font-weight-bold animated--grow-in">Reviews</h1>

			<Row className="justify-content-center animated--grow-in">
				<Col md="7" lg="4" className="mb-3">
					<Card className="card-animate" body color="primary" inverse>
						<CardTitle tag="h5">Teaching</CardTitle>
						<CardText>Teaching of the course.</CardText>
						<Row>
							<Col>
								<Link to="/review/teaching">
									<Button className="btn-light">Review</Button>
								</Link>
							</Col>
							<Col className="text-right">
								<Link to="/review/teaching/all">
									<Button className="btn-light">Reviews</Button>
								</Link>
							</Col>
						</Row>
					</Card>
				</Col>
				<Col md="7" lg="4" className="mb-3">
					<Card className="card-animate" body color="info" inverse>
						<CardTitle tag="h5">Instructor</CardTitle>
						<CardText>Instructor of the course.</CardText>
						<Row>
							<Col>
								<Link to="/review/instructor">
									<Button className="btn-light">Review</Button>
								</Link>
							</Col>
							<Col className="text-right">
								<Link to="/review/instructor/all">
									<Button className="btn-light">Reviews</Button>
								</Link>
							</Col>
						</Row>
					</Card>
				</Col>
				<Col md="7" lg="4" className="mb-3">
					<Card className="card-animate" body color="success" inverse>
						<CardTitle tag="h5">General</CardTitle>
						<CardText>General aspects of the course.</CardText>
						<Row>
							<Col>
								<Link to="/review/general">
									<Button className="btn-light">Review</Button>
								</Link>
							</Col>
							<Col className="text-right">
								<Link to="/review/general/all">
									<Button className="btn-light">Reviews</Button>
								</Link>
							</Col>
						</Row>
					</Card>
				</Col>
			</Row>
		</>
	);
}
