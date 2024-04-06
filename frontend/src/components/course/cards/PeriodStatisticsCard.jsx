import { Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck, faCopy } from '@fortawesome/free-regular-svg-icons';
import { DoughnutType, SemesterType } from '../../../constants/enums';
import DoughnutChart from '../../charts/Doughnut';

export default function PeriodStatisticsCard({
	user,
	grades,
	statement,
	isGradesLoading,
	isStatementsLoading,
}) {
	return (
		<>
			<div className="profile_card">
				<div className="card-body">
					<Row className="mb-2 d-flex flex-column align-items-center text-center">
						<Col>
							<small
								className="text-muted pill-label mb-2"
								style={{
									textAlign: 'justify',
									fontWeight: '700',
									fontSize: 18,
								}}
							>
								Period Statistics
							</small>
						</Col>
						<Col>
							<small
								className="text-muted"
								style={{
									textAlign: 'justify',
									fontWeight: '600',
									fontSize: 11,
								}}
							>
								{!isStatementsLoading ? (
									<>
										{statement?.semester?.type?.includes(SemesterType.Winter)
											? 'FEBRUARY '
											: 'JUNE '}
										{statement?.semester?.academicYear}
									</>
								) : null}
							</small>
						</Col>
						<Col className="mt-2 d-flex flex-column align-items-center text-center">
							<div style={{ width: '210px', height: '210px' }}>
								<DoughnutChart
									type={DoughnutType.Period}
									passed={grades.length}
									registered={statement?.teaching?.length}
									user={user}
									labels={['Failed', 'Passed']}
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
											<>{statement?.teaching?.length}</>
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
									throughout the exam period
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
									<span className="text-secondary">
										{!isGradesLoading ? <>{grades.length}</> : null}
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
									throughout the exam period
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
										Degree Average
									</h6>
									<span className="text-secondary">6.31(dummy)</span>
								</Col>
							</Row>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
}
