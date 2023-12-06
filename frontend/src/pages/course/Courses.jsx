import { Link } from 'react-router-dom';
import { Card, CardText, CardTitle, Row, Col } from 'reactstrap';

export default function Courses() {
	return (
		<>
			<Row className="mb-4 animated--grow-in">
				<Col>
					<h3 className="text-gray-800 font-weight-bold">Studies</h3>
				</Col>
			</Row>

			<Row className="justify-content-center animated--grow-in">
				<Col md="8" lg="7" xl="4" className="mb-4">
					<Link style={{ textDecoration: 'none' }} to="/course/undergraduate">
						<Card body color="primary" className="card-animate" inverse>
							<CardTitle tag="h4" className="text-center">
								Undergraduate
							</CardTitle>
							<CardText className="mt-3 text-center">
								Undergraduate program guide
							</CardText>
						</Card>
					</Link>
				</Col>
				<Col md="8" lg="7" xl="4" className="mb-4">
					<Link style={{ textDecoration: 'none' }} to="/course/msc">
						<Card className="card-animate" body color="info" inverse>
							<CardTitle tag="h4" className="text-center">
								Msc
							</CardTitle>
							<CardText className="mt-3 text-center">
								Master of Science program guide
							</CardText>
						</Card>
					</Link>
				</Col>
			</Row>

			<Row className="justify-content-center animated--grow-in">
				<Col md="8" lg="7" xl="4" className="mb-5">
					<Link style={{ textDecoration: 'none' }} to="/course/phd">
						<Card body color="warning" className="card-animate" inverse>
							<CardTitle tag="h4" className="text-center">
								Phd
							</CardTitle>
							<CardText className="mt-3 text-center">
								Doctoral Diploma program guide
							</CardText>
						</Card>
					</Link>
				</Col>
			</Row>

			{/* <img
				className="mx-auto d-block image mb-5"
				src="undraw_content_structure.svg"
				alt="Forbidden"
			/> */}
		</>
	);
}
