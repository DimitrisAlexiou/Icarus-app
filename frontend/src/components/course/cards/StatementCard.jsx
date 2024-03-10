import { Row, Col } from 'reactstrap';
import {
	faCircleDot,
	faClock,
	faFileLines,
} from '@fortawesome/free-regular-svg-icons';
import {
	faBarcode,
	faDiagramPredecessor,
	faFlask,
	faPersonChalkboard,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getOrdinalNumbers } from '../../../utils/ordinalNumbers';
import { SemesterType } from '../../../constants/enums';
import { academicYearEnd } from '../../../utils/academicYears';
import StatementCardInfo from './StatementCardInfo';

const StatementCard = ({ statement }) => {
	return (
		<>
			<StatementCardInfo statement={statement} />
			{statement?.teaching?.map((teaching, index) => (
				<div key={index}>
					<Row className="mb-1 text-left">
						<h6
							className="text-gray-700"
							style={{
								fontWeight: '600',
								fontSize: 18,
							}}
						>
							<FontAwesomeIcon className="mr-2" icon={faCircleDot} />
							{getOrdinalNumbers(index + 1)}
						</h6>
					</Row>
					<ul className="list-group list-group-flush">
						<li className="list-group-item">
							<Row>
								<Col className="d-flex justify-content-between flex-wrap">
									<h6
										className="text-gray-600"
										style={{
											fontWeight: '500',
										}}
									>
										<FontAwesomeIcon
											className="mr-2 text-gray-600"
											icon={faFileLines}
										/>
										{teaching?.course?.title}
									</h6>
									<span className="text-secondary">
										{getOrdinalNumbers(teaching?.course?.year)} Year
									</span>
								</Col>
								<Row className="mt-2">
									<Col xs="12" sm="12" md="3" lg="3" xl="2">
										<small
											className="text-muted"
											style={{
												textAlign: 'justify',
												fontWeight: '600',
												fontSize: 11,
											}}
										>
											<FontAwesomeIcon
												className="mr-2 text-gray-600"
												icon={faBarcode}
											/>
											{teaching?.course?.courseId}
										</small>
									</Col>
									<Col xs="12" sm="12" md="7" lg="7" xl="4">
										<small
											className="text-muted"
											style={{
												textAlign: 'justify',
												fontWeight: '600',
												fontSize: 11,
											}}
										>
											<FontAwesomeIcon
												className="mr-2 text-gray-600"
												icon={faPersonChalkboard}
											/>
											{teaching?.theoryInstructors?.length
												? teaching?.theoryInstructors?.map(
														(instructor, index) => (
															<span key={instructor._id}>
																{index > 0 && ', '}
																{`${instructor?.user?.name.toUpperCase()} ${instructor?.user?.surname.toUpperCase()}`}
															</span>
														)
												  )
												: 'No theory instructors'}
										</small>
									</Col>
									<Col xs="12" sm="12" md="7" lg="7" xl="4">
										<small
											className="text-muted"
											style={{
												textAlign: 'justify',
												fontWeight: '600',
												fontSize: 11,
											}}
										>
											<FontAwesomeIcon
												className="mr-2 text-gray-600"
												icon={faFlask}
											/>
											{teaching?.labInstructors?.length
												? teaching?.labInstructors?.map((instructor, index) => (
														<span key={instructor._id}>
															{index > 0 && ', '}
															{`${instructor?.user?.name.toUpperCase()} ${instructor?.user?.surname.toUpperCase()}`}
														</span>
												  ))
												: 'No lab instructors'}
										</small>
									</Col>
									<Col xs="12" sm="12" md="4" lg="3" xl="3">
										<small
											className="text-muted"
											style={{
												textAlign: 'justify',
												fontWeight: '600',
												fontSize: 11,
											}}
										>
											<FontAwesomeIcon
												className="mr-2 text-gray-600"
												icon={faClock}
											/>
											{statement?.semester?.type === SemesterType.Spring
												? 'JUN '
												: 'FEB '}
											{academicYearEnd}
										</small>
									</Col>
									<Col xs="12" sm="12" md="4" lg="3" xl="3">
										<small
											className="text-muted"
											style={{
												textAlign: 'justify',
												fontWeight: '600',
												fontSize: 11,
											}}
										>
											<FontAwesomeIcon
												className="mr-2 text-gray-600"
												icon={faDiagramPredecessor}
											/>
											{teaching?.course?.cycle
												? teaching.course.cycle.cycle
												: 'Obligatory'}
										</small>
									</Col>
								</Row>
							</Row>
						</li>
					</ul>
					<hr />
				</div>
			))}
		</>
	);
};

export default StatementCard;
