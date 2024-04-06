import { Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faChartSimple,
	faCircleNodes,
} from '@fortawesome/free-solid-svg-icons';
import {
	faCircleCheck,
	faCopy,
	faLightbulb,
} from '@fortawesome/free-regular-svg-icons';
import { DoughnutType } from '../../../constants/enums';
import DoughnutChart from '../../charts/Doughnut';

export default function CoursesCard({
	user,
	passedTeachings,
	statementsTotalTeachings,
	totalECTS,
	isStatementsLoading,
	isPassedTeachingsLoading,
}) {
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
								Courses
							</small>
						</Col>
						<Col className="mt-2 d-flex flex-column align-items-center text-center">
							<div style={{ width: '210px', height: '210px' }}>
								<DoughnutChart
									type={DoughnutType.General}
									user={user}
									registered={statementsTotalTeachings.totalTeachings}
									labels={['Registered - Failed', 'Passed']}
									label={'Courses'}
									colors={['rgb(255, 99, 132)', 'rgb(54, 162, 235)']}
								/>
							</div>
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
											icon={faCopy}
										/>
										Registered Courses
									</h6>
									<span className="text-secondary">
										{!isStatementsLoading ? (
											<>{statementsTotalTeachings.totalTeachings}</>
										) : null}
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
									throughout the course of study
								</small>
							</Row>
						</li>
					</ul>
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
											icon={faCircleCheck}
										/>
										Passed Courses
									</h6>
									<span
										className="text-success"
										style={{
											textAlign: 'justify',
											fontWeight: '600',
										}}
									>
										{!isPassedTeachingsLoading ? (
											<>{passedTeachings.length}</>
										) : null}
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
									counting towards degree
								</small>
							</Row>
						</li>
					</ul>
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
											icon={faCircleNodes}
										/>
										Registered ECTS
									</h6>
									<span className="text-secondary">
										{!isStatementsLoading ? (
											<>{statementsTotalTeachings.totalTeachingsECTS}</>
										) : null}
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
									throughout the course of study
								</small>
							</Row>
						</li>
					</ul>
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
											icon={faLightbulb}
										/>
										Total ECTS
									</h6>
									<span className="text-secondary">{totalECTS}/300</span>
								</Col>
								<small
									className="text-muted"
									style={{
										textAlign: 'justify',
										fontWeight: '600',
										fontSize: 11,
									}}
								>
									counting towards degree
								</small>
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
										Weighted Grade Average
									</h6>
									<span className="text-secondary">6.31(dummy)</span>
								</Col>
								<small
									className="text-muted"
									style={{
										textAlign: 'justify',
										fontWeight: '600',
										fontSize: 11,
									}}
								>
									Grade Average
								</small>
							</Row>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
}
