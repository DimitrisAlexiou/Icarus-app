import { Row, Col } from 'reactstrap';
import useNewCourse from '../../../hooks/course/useNewCourse';
import CourseForm from '../../../components/course/forms/CourseForm';
import BackButton from '../../../components/buttons/BackButton';
import Spinner from '../../../components/boilerplate/spinners/Spinner';
import FormHeader from '../../../components/boilerplate/headers/FormHeader';

export default function NewCourse() {
	const {
		courses,
		cycles,
		semesters,
		masters,
		coursesIsLoading,
		cyclesIsLoading,
		semestersIsLoading,
		dispatch,
	} = useNewCourse();

	return (
		<>
			<Row className="mb-4 animated--grow-in">
				<Col sm="6" xs="9" md="6">
					<h3 className="text-gray-800 font-weight-bold">Create Course</h3>
				</Col>
				<Col className="d-flex justify-content-end">
					<BackButton url={'/course'} />
				</Col>
			</Row>

			{!semesters.length ? (
				<Row className="mb-3 animated--grow-in">
					<Col className="d-flex justify-content-center">
						<span className="text-sm text-gray-500">
							<small
								className="text-warning pill-label mb-3"
								style={{
									textAlign: 'justify',
									fontWeight: '700',
									fontSize: 16,
								}}
							>
								Warning
							</small>
							Semesters must be defined first in order to create a course.
						</span>
					</Col>
				</Row>
			) : null}

			<Row className="justify-content-center animated--grow-in">
				<Col
					lg="9"
					style={{
						pointerEvents: semesters.length ? 'auto' : 'none',
						opacity: semesters.length ? 1 : 0.6,
					}}
				>
					<div className="card shadow mb-4">
						<FormHeader title="Fill the form below to create a new course" />

						<div className="card-body">
							{coursesIsLoading || cyclesIsLoading || semestersIsLoading ? (
								<Spinner card />
							) : (
								<CourseForm
									courses={courses}
									cycles={cycles}
									masters={masters}
									dispatch={dispatch}
								/>
							)}
						</div>
					</div>
				</Col>
			</Row>
		</>
	);
}
