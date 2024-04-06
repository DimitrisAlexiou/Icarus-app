import { Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faBarcode,
	faChartSimple,
	faPersonChalkboard,
	faScroll,
} from '@fortawesome/free-solid-svg-icons';

export default function ThesisCard({ user, statement }) {
	return (
		<>
			<div className="profile_card">
				<div className="card-body">
					<Row className="mb-2 d-flex flex-column align-items-center text-center">
						<Col>
							<small
								className="text-muted pill-label"
								style={{
									textAlign: 'justify',
									fontWeight: '700',
									fontSize: 18,
								}}
							>
								Thesis
							</small>
						</Col>
					</Row>
					<ul className="list-group list-group-flush">
						<li className="list-group-item">
							<Row>
								<Col className="d-flex justify-content-between flex-wrap">
									<h6
										className="text-gray-600"
										style={{
											fontWeight: '600',
										}}
									>
										<FontAwesomeIcon
											className="mr-2 text-gray-600"
											icon={faScroll}
										/>
										Icarus Student Management System
									</h6>
								</Col>
								<Row className="mt-2">
									<Col xs="12" sm="12" md="4" lg="3" xl="2">
										<small
											className="text-muted"
											style={{
												textAlign: 'justify',
												fontWeight: '600',
												fontSize: 13,
											}}
										>
											<FontAwesomeIcon
												className="mr-2 text-gray-600"
												icon={faBarcode}
											/>
											321-00000
										</small>
									</Col>
									<Col>
										<small
											className="text-muted"
											style={{
												textAlign: 'justify',
												fontWeight: '600',
												fontSize: 13,
											}}
										>
											<FontAwesomeIcon
												className="mr-2 text-gray-600"
												icon={faPersonChalkboard}
											/>
											ΚΥΡΙΑΚΟΣ ΚΡΗΤΙΚΟΣ
											{/* {user.user.name.toUpperCase()} */}
										</small>
									</Col>
								</Row>
							</Row>
						</li>
					</ul>
					<hr />
					<ul className="list-group list-group-flush">
						<li className="list-group-item">
							<Row>
								<Col className="d-flex justify-content-between flex-wrap">
									<h6
										className="text-gray-600"
										style={{
											fontWeight: '600',
										}}
									>
										<FontAwesomeIcon
											className="mr-2 text-gray-600"
											icon={faChartSimple}
										/>
										Grade
									</h6>
									<span className="text-secondary">6.31</span>
								</Col>
							</Row>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
}
