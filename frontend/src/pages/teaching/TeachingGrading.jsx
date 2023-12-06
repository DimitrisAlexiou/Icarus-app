import { Row, Col, CardTitle, CardText } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCircleCheck,
	faCircleXmark,
} from '@fortawesome/free-regular-svg-icons';
import useTeachingGrading from '../../hooks/teaching/useTeachingGrading';
import CarouselComponent from '../../components/Carousel';
import Spinner from '../../components/boilerplate/spinners/Spinner';
import CurrentSemester from '../../components/boilerplate/CurrentSemester';
import SpinnerComponent from '../../components/boilerplate/spinners/SpinnerMessage';
import Header from '../../components/boilerplate/Header';

export default function TeachingGrading() {
	const {
		semester,
		teachings,
		isSemesterLoading,
		isTeachingsLoading,
		filteredTeachings,
		handleTeachingClick,
	} = useTeachingGrading();

	return (
		<>
			<Row className="mb-4 animated--grow-in">
				<Col>
					<h3 className="text-gray-800 font-weight-bold">Teaching Grading</h3>
				</Col>
				<CurrentSemester />
			</Row>

			<Row className="mt-3 mb-4 justify-content-between animated--grow-in">
				<Col className="text-center">
					<Header title="active teachings" />
				</Col>
			</Row>

			{isSemesterLoading || isTeachingsLoading ? (
				<Spinner card />
			) : !teachings.length > 0 ? (
				<div className="mb-5">
					<SpinnerComponent message="There are no teachings available right now." />
				</div>
			) : filteredTeachings.length > 0 ? (
				<CarouselComponent
					objects={filteredTeachings.filter(
						(teaching) => teaching.semester._id === semester._id
					)}
					renderItem={(teaching) => (
						<>
							<Row className="mb-2">
								<Col>
									<CardTitle
										style={{
											textAlign: 'justify',
											fontWeight: '700',
											fontSize: 15,
										}}
										className="text-light-cornflower-blue mb-2"
									>
										<Row>
											<Col>{teaching.course.title}</Col>
										</Row>
									</CardTitle>
								</Col>
								<Col className="d-flex justify-content-end">
									<CardText
										style={{
											textAlign: 'justify',
											fontWeight: '600',
											fontSize: 11,
										}}
									>
										{teaching.course.courseId}
									</CardText>
								</Col>
							</Row>
							<CardText>
								<Row className="mt-1">
									<Col>
										<small
											className={
												teaching.theoryExamination.length
													? 'text-success pill-label'
													: 'text-muted pill-label'
											}
											style={{
												textAlign: 'justify',
												fontWeight: '700',
												fontSize: 12,
											}}
										>
											Theory
										</small>
									</Col>
									<Col>
										<small
											className={
												teaching.theoryExamination.length
													? 'text-success'
													: 'text-muted'
											}
											style={{
												textAlign: 'justify',
												fontWeight: '700',
												fontSize: 14,
											}}
										>
											{teaching.theoryExamination.length ? (
												<>
													<FontAwesomeIcon icon={faCircleCheck} />
													<span className="mx-2">Assigned</span>
												</>
											) : (
												<>
													<FontAwesomeIcon icon={faCircleXmark} />
													<span className="mx-2">Unassigned</span>
												</>
											)}
										</small>
									</Col>
								</Row>
							</CardText>
							<CardText>
								<Row className="mt-1">
									<Col>
										<small
											className={
												teaching.labExamination.length
													? 'text-success pill-label'
													: 'text-muted pill-label'
											}
											style={{
												textAlign: 'justify',
												fontWeight: '700',
												fontSize: 12,
											}}
										>
											Lab
										</small>
									</Col>
									<Col>
										<small
											className={
												teaching.labExamination.length
													? 'text-success'
													: 'text-muted'
											}
											style={{
												textAlign: 'justify',
												fontWeight: '700',
												fontSize: 14,
											}}
										>
											{teaching.labExamination.length ? (
												<>
													<FontAwesomeIcon icon={faCircleCheck} />
													<span className="mx-2">Assigned</span>
												</>
											) : (
												<>
													<FontAwesomeIcon icon={faCircleXmark} />
													<span className="mx-2">Unassigned</span>
												</>
											)}
										</small>
									</Col>
								</Row>
							</CardText>
						</>
					)}
					onObjectClick={(teaching) => handleTeachingClick(teaching)}
				/>
			) : (
				<div className="mt-5 mb-5">
					<SpinnerComponent message="There are no active teachings available in the current semester." />
				</div>
			)}
		</>
	);
}
