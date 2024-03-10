import { Row, Col } from 'reactstrap';
import { ExaminationType } from '../../../constants/enums';

const GradingCard = ({ teaching }) => {
	return (
		<>
			<Row>
				<Col xl="6" lg="6" md="12" sm="12" xs="12">
					<small
						className="text-muted pill-label mb-3"
						style={{
							textAlign: 'justify',
							fontWeight: '700',
							fontSize: 18,
						}}
					>
						Theory
					</small>
				</Col>
			</Row>
			{teaching.theoryExamination.length ? (
				teaching.theoryExamination.map((examination, index) => (
					<Row className="mb-3" key={index}>
						<label>
							<b
								style={{
									textAlign: 'justify',
									fontWeight: '600',
									fontSize: 13,
								}}
							>
								Examination {index + 1}
							</b>
						</label>
						<Row>
							<Col xs="12" md="12" xl="4">
								<label>
									<b>Type</b>
								</label>
								<br />
								<small
									className={`pill-label ${
										examination.type === ExaminationType.Progress
											? 'text-primary'
											: examination.type === ExaminationType.Final
											? 'text-danger'
											: examination.type === ExaminationType.Exercise
											? 'text-warning'
											: 'text-info'
									}`}
									style={{
										textAlign: 'justify',
										fontWeight: '700',
										fontSize: 12,
									}}
								>
									{examination.type}
								</small>
							</Col>
							<Col xs="12" md="6" xl="4">
								<label>
									<b>Weight</b>
								</label>
								<p style={{ textAlign: 'justify' }}>{examination.weight}</p>
							</Col>
							<Col xs="12" md="6" xl="4">
								<label>
									<b>Lower Grade Threshhold</b>
								</label>
								<p style={{ textAlign: 'justify' }}>
									{examination.lowerGradeThreshold}
								</p>
							</Col>
						</Row>
					</Row>
				))
			) : (
				<p>Not yet assigned</p>
			)}
			<hr />
			<Row>
				<Col xl="6" lg="6" md="12" sm="12" xs="12">
					<small
						className="text-muted pill-label mb-3"
						style={{
							textAlign: 'justify',
							fontWeight: '700',
							fontSize: 18,
						}}
					>
						Lab
					</small>
				</Col>
			</Row>
			{teaching.labExamination.length ? (
				teaching.labExamination.map((examination, index) => (
					<Row className="mb-3" key={index}>
						<label>
							<b
								style={{
									textAlign: 'justify',
									fontWeight: '600',
									fontSize: 13,
								}}
							>
								Examination {index + 1}
							</b>
						</label>
						<Row>
							<Col xs="12" md="12" xl="4">
								<label>
									<b>Type</b>
								</label>
								<br />
								<small
									className={`pill-label ${
										examination.type === ExaminationType.Progress
											? 'text-primary'
											: examination.type === ExaminationType.Final
											? 'text-danger'
											: examination.type === ExaminationType.Exercise
											? 'text-warning'
											: 'text-info'
									}`}
									style={{
										textAlign: 'justify',
										fontWeight: '700',
										fontSize: 12,
									}}
								>
									{examination.type}
								</small>
							</Col>
							<Col xs="12" md="6" xl="4">
								<label>
									<b>Weight</b>
								</label>
								<p style={{ textAlign: 'justify' }}>{examination.weight}</p>
							</Col>
							<Col xs="12" md="6" xl="4">
								<label>
									<b>Lower Grade Threshhold</b>
								</label>
								<p style={{ textAlign: 'justify' }}>
									{examination.lowerGradeThreshold}
								</p>
							</Col>
						</Row>
					</Row>
				))
			) : teaching.course.hasLab ? (
				<p>Not yet assigned</p>
			) : (
				<p className="text-warning">Not applicable</p>
			)}
		</>
	);
};

export default GradingCard;
