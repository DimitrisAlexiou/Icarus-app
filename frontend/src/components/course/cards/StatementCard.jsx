import { Row, Col } from 'reactstrap';
import { faCircleDot } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getOrdinalYears } from '../../../utils/semesters';

const StatementCard = ({ statement }) => {
	return (
		<>
			<Row className="mb-3 text-center">
				<label
					style={{
						fontWeight: '700',
						fontSize: 25,
					}}
				>
					<b>Semester</b>
				</label>
				<p
					style={{
						fontWeight: '500',
						fontSize: 18,
					}}
					className="text-light-cornflower-blue"
				>
					{statement?.semester?.type} {statement?.semester?.academicYear}
				</p>
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
			{statement.teaching.map((teaching, index) => (
				<div key={index}>
					<Row className="mb-1 text-center">
						<h6
							className="text-light-cornflower-blue"
							style={{
								fontWeight: '600',
								fontSize: 18,
							}}
						>
							<FontAwesomeIcon className="mr-2" icon={faCircleDot} />
							{`${index + 1}${
								index === 0
									? 'st'
									: index === 1
									? 'nd'
									: index === 2
									? 'rd'
									: 'th'
							}`}
						</h6>
					</Row>
					<Row className="mb-3 text-center">
						<Col>
							<small
								className="pill-label"
								style={{
									textAlign: 'justify',
									fontWeight: '700',
									fontSize: 15,
								}}
							>
								ID
							</small>
							<small
								style={{
									textAlign: 'justify',
									fontWeight: '700',
									fontSize: 14,
								}}
							>
								{teaching?.course?.courseId}
							</small>
						</Col>
						<Col>
							<small
								className="pill-label"
								style={{
									textAlign: 'justify',
									fontWeight: '700',
									fontSize: 15,
								}}
							>
								Title
							</small>
							<small
								style={{
									textAlign: 'justify',
									fontWeight: '700',
									fontSize: 14,
								}}
							>
								{teaching?.course?.title}
							</small>
						</Col>
					</Row>
					<Row className="mb-3 text-center">
						<Col>
							<small
								className="pill-label"
								style={{
									textAlign: 'justify',
									fontWeight: '700',
									fontSize: 15,
								}}
							>
								Cycle
							</small>
							<small
								style={{
									textAlign: 'justify',
									fontWeight: '700',
									fontSize: 14,
								}}
							>
								{teaching?.course?.cycle
									? teaching.course.cycle.cycle
									: 'Obligatory'}
							</small>
						</Col>
						<Col>
							<small
								className="pill-label"
								style={{
									textAlign: 'justify',
									fontWeight: '700',
									fontSize: 15,
								}}
							>
								Year
							</small>
							<small
								style={{
									textAlign: 'justify',
									fontWeight: '700',
									fontSize: 14,
								}}
							>
								{getOrdinalYears(teaching?.course?.year)}
							</small>
						</Col>
					</Row>
				</div>
			))}
		</>
	);
};

export default StatementCard;
