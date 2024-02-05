import { Row, Col } from 'reactstrap';
import { faChalkboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CourseType } from '../../constants/enums';
import useCourse from '../../hooks/course/useCourse';
import CourseCard from '../../components/course/cards/CourseCard';
import BackButton from '../../components/buttons/BackButton';
import Spinner from '../../components/boilerplate/spinners/Spinner';
import Header from '../../components/boilerplate/headers/Header';

export default function Course() {
	const {
		course,
		teaching,
		courseIsLoading,
		teachingsIsLoading,
		handleNavigateToTeaching,
	} = useCourse();

	return (
		<>
			<Header title={course.title} />

			<Row className="justify-content-center animated--grow-in">
				<Col xs="12" sm="12" md="12" lg="10" xl="10">
					<div className="card shadow mb-4">
						<div className="card-header py-3">
							<Row className="d-flex justify-content-between align-items-center">
								<Col md="6">
									<h6 className="m-0 font-weight-bold text-primary">
										Course Information
									</h6>
								</Col>
								{course.isActive && teaching ? (
									<Col className="d-flex justify-content-end">
										<Row>
											<Col>
												<FontAwesomeIcon
													style={{
														textAlign: 'justify',
														fontWeight: '700',
														fontSize: 14,
													}}
													icon={faChalkboard}
												/>
												<small
													className="mx-2 text-muted pill-label clickable-no-padding"
													style={{
														textAlign: 'justify',
														fontWeight: '700',
														fontSize: 12,
													}}
													onClick={() => handleNavigateToTeaching(teaching)}
												>
													Teaching
												</small>
											</Col>
										</Row>
									</Col>
								) : null}
								<Col md="1" sm="1">
									{course.type !== CourseType.Master ? (
										<BackButton url={'/course/undergraduate'} />
									) : (
										<BackButton url={`/course/msc/${course.master?._id}`} />
									)}
								</Col>
							</Row>
						</div>
						{courseIsLoading || teachingsIsLoading ? (
							<Spinner card />
						) : (
							<div className="card-body">
								<CourseCard key={course._id} course={course} />
							</div>
						)}
					</div>
				</Col>
			</Row>
		</>
	);
}
