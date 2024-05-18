import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row } from 'reactstrap';
import { faClock, faFileLines } from '@fortawesome/free-regular-svg-icons';
import {
	faBarcode,
	faDiagramPredecessor,
	faFlask,
	faPersonChalkboard,
} from '@fortawesome/free-solid-svg-icons';
import { academicYearEnd } from '../../../utils/academicYears';
import {
	CourseObligation,
	ExamPeriods,
	SemesterType,
} from '../../../constants/enums';

const GradeCardInfo = ({ teaching, statement, overallGrade }) => {
	return (
		<Row className="mb-3">
			<Col className="d-flex justify-content-between flex-wrap">
				<h6
					className="text-gray-600"
					style={{
						fontWeight: '500',
					}}
				>
					<FontAwesomeIcon className="mr-2 text-gray-600" icon={faFileLines} />
					{teaching?.course?.title}
				</h6>
				<small
					className="text-muted"
					style={{
						textAlign: 'justify',
						fontWeight: '600',
						fontSize: 12,
					}}
				>
					<span
						className="text-secondary pill-label"
						style={{
							fontWeight: '600',
							fontSize: 13,
						}}
					>
						Overall grade
					</span>
					<span
						style={{
							fontWeight: '600',
							fontSize: 18,
						}}
					>
						{overallGrade}
					</span>
				</small>
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
						<FontAwesomeIcon className="mr-2 text-gray-600" icon={faBarcode} />
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
							? teaching?.theoryInstructors?.map((instructor, index) => (
									<span key={instructor._id}>
										{index > 0 && ', '}
										{`${instructor?.user?.name.toUpperCase()} ${instructor?.user?.surname.toUpperCase()}`}
									</span>
							  ))
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
						<FontAwesomeIcon className="mr-2 text-gray-600" icon={faFlask} />
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
				<Col xs="12" sm="12" md="3" lg="3" xl="3">
					<small
						className="text-muted"
						style={{
							textAlign: 'justify',
							fontWeight: '600',
							fontSize: 11,
						}}
					>
						<FontAwesomeIcon className="mr-2 text-gray-600" icon={faClock} />
						{statement?.semester?.type?.includes(SemesterType.Spring)
							? ExamPeriods.JUN
							: ExamPeriods.FEB}{' '}
						{academicYearEnd}
					</small>
				</Col>
				<Col xs="12" sm="12" md="3" lg="3" xl="3">
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
							: CourseObligation.Obligatory}
					</small>
				</Col>
			</Row>
		</Row>
	);
};

export default GradeCardInfo;
