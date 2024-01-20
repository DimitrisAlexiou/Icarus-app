import { Row, Col, CardText } from 'reactstrap';
import {
	faCircleDot,
	faClock,
	faFileLines,
} from '@fortawesome/free-regular-svg-icons';
import {
	faBarcode,
	faDiagramPredecessor,
	faPersonChalkboard,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getOrdinalNumbers } from '../../../utils/ordinalNumbers';
import { AssessmentStatus, SemesterType } from '../../../constants/enums';
import { academicYearEnd } from '../../../utils/academicYears';

const StatementCard = ({ statement }) => {
	return (
		<>
			<Row className="mb-2">
				<Col>
					<Row className="align-items-center">
						<Col xs="12" sm="12" md="6">
							<CardText
								style={{
									fontWeight: '700',
									fontSize: 25,
								}}
							>
								<b>Semester</b>
							</CardText>
						</Col>
						<Col md="12">
							<CardText
								style={{
									fontWeight: '500',
									fontSize: 16,
								}}
								className="text-light-cornflower-blue"
							>
								{statement?.semester?.type} {statement?.semester?.academicYear}
							</CardText>
						</Col>
					</Row>
				</Col>
				<Col className="text-right">
					<small
						className={
							statement?.condition === AssessmentStatus.Finalized
								? 'text-success pill-label'
								: 'text-warning pill-label'
						}
						style={{
							textAlign: 'justify',
							fontWeight: '700',
							fontSize: 12,
						}}
					>
						{statement?.condition}
					</small>
				</Col>
			</Row>
			<Row className="text-center">
				<label
					style={{
						fontWeight: '700',
						fontSize: 25,
					}}
					className="mb-3"
				>
					Courses
				</label>
			</Row>
			{statement?.teaching.map((teaching, index) => (
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
									<Col xs="12" sm="12" md="7" lg="6" xl="4">
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
											{teaching?.theoryInstructors?.map((instructor, index) => (
												<span key={instructor._id}>
													{index > 0 && ', '}
													{`${instructor?.user?.name.toUpperCase()} ${instructor?.user?.surname.toUpperCase()}`}
												</span>
											))}
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
