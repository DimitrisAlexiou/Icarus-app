import { Link } from 'react-router-dom';
import { Button, Card, CardText, CardTitle, Row, Col } from 'reactstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

withReactContent(Swal);

export default function Reviews() {
	return (
		<>
			<div id="content-wrapper" className="d-flex flex-column">
				<div id="content">
					<div>
						<h1 className="h3 mb-5 text-gray-800 font-weight-bold">
							Reviews !
						</h1>

						<div className="row justify-content-center">
							<Row>
								<Col md="7" lg="4">
									<Card body color="primary" inverse>
										<CardTitle tag="h5">Teaching Review</CardTitle>
										<CardText>Review the teaching of the course.</CardText>
										<div className="row">
											<div className="col-sm-6">
												<Link to="/review/teaching">
													<Button>Review</Button>
												</Link>
											</div>
											{/* <div className="col-sm-6 text-right">
												<Link to="/review/teaching/all">
													<Button>See Reviews</Button>
												</Link>
											</div> */}
										</div>
									</Card>
								</Col>
								<Col md="7" lg="4">
									<Card body color="info" inverse>
										<CardTitle tag="h5">Instructor Review</CardTitle>
										<CardText>Review the instructor of the course.</CardText>
										<div className="row">
											<div className="col-sm-6">
												<Link to="/review/instructor">
													<Button>Review</Button>
												</Link>
											</div>
											{/* <div className="col-sm-6 text-right">
												<Link to="/review/instructor/all">
													<Button>See Reviews</Button>
												</Link>
											</div> */}
										</div>
									</Card>
								</Col>
								<Col md="7" lg="4">
									<Card body color="success" inverse>
										<CardTitle tag="h5">General Review</CardTitle>
										<CardText>
											Review the general aspects of the course.
										</CardText>
										<div className="row">
											<div className="col-sm-6">
												<Link to="/review/general">
													<Button>Review</Button>
												</Link>
											</div>
											{/* <div className="col-sm-6 text-right">
												<Link to="/review/general/all">
													<Button>See Reviews</Button>
												</Link>
											</div> */}
										</div>
									</Card>
								</Col>
							</Row>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
