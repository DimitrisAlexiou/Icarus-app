import { Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faChartSimple,
	faCircleNotch,
} from '@fortawesome/free-solid-svg-icons';
import { faClone } from '@fortawesome/free-regular-svg-icons';

export default function ProgressCard({ calculateRemainingCourses }) {
	return (
		<>
			<div className="profile_card">
				<div className="card-body">
					<Row className="mb-3 d-flex flex-column align-items-center text-center">
						<Col>
							<small
								className="text-muted pill-label"
								style={{
									textAlign: 'justify',
									fontWeight: '700',
									fontSize: 18,
								}}
							>
								Progress
							</small>
						</Col>
					</Row>
					<div>
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
												icon={faCircleNotch}
											/>
											Cycles
										</h6>
										<span className="text-secondary"></span>
									</Col>
									<small
										className="text-muted"
										style={{
											textAlign: 'justify',
											fontWeight: '600',
											fontSize: 11,
										}}
									>
										closed cycles
									</small>
								</Row>
							</li>
						</ul>
					</div>
					<div>
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
												icon={faClone}
											/>
											Courses
										</h6>
										<span className="text-secondary">
											{calculateRemainingCourses()}
										</span>
									</Col>
									<small
										className="text-muted"
										style={{
											textAlign: 'justify',
											fontWeight: '600',
											fontSize: 11,
										}}
									>
										remaining courses for degree completion
									</small>
								</Row>
							</li>
						</ul>
					</div>
					<div>
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
											Grade Average
										</h6>
										<span className="text-secodary"></span>
									</Col>
									<small
										className="text-muted"
										style={{
											textAlign: 'justify',
											fontWeight: '600',
											fontSize: 11,
										}}
									>
										weighted degree average grade
									</small>
								</Row>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
}
