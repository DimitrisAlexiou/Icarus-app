import { Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCircleNotch,
	faPeopleGroup,
} from '@fortawesome/free-solid-svg-icons';
import { faClone, faFileLines } from '@fortawesome/free-regular-svg-icons';
import Spinner from '../../boilerplate/spinners/Spinner';
import SpinnerComponent from '../../boilerplate/spinners/SpinnerMessage';

export default function PrerequisitesCard({
	degreeRules,
	isDegreeRulesLoading,
}) {
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
								Prerequisites
							</small>
						</Col>
					</Row>
					{isDegreeRulesLoading ? (
						<Spinner card />
					) : degreeRules ? (
						<>
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
												<span className="text-secondary">
													{!isDegreeRulesLoading ? (
														<>{degreeRules?.cycles}</>
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
												cycles that are obligatory to be closed
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
													Cycle Courses
												</h6>
												<span className="text-secondary">
													{!isDegreeRulesLoading ? (
														<>{degreeRules?.cycleCourses}</>
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
												courses that are obligatory to be passed for cycle
												completion
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
														icon={faFileLines}
													/>
													Courses
												</h6>
												<span className="text-secondary">
													{!isDegreeRulesLoading ? (
														<>{degreeRules?.courses}</>
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
												required courses for degree completion
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
														icon={faPeopleGroup}
													/>
													Practice
												</h6>
												<span
													className={
														degreeRules.practice
															? 'text-warning'
															: 'text-success'
													}
												>
													{!isDegreeRulesLoading ? (
														<>{degreeRules?.practice ? 'Yes' : 'No'}</>
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
												required practice for degree completion
											</small>
										</Row>
									</li>
								</ul>
							</div>
						</>
					) : (
						<SpinnerComponent
							message={`There aren't any degree rules configured right now.`}
						/>
					)}
				</div>
			</div>
		</>
	);
}
