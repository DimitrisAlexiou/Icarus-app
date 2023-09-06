import { useDispatch } from 'react-redux';
import { FormGroup, Row, Col, Button, Spinner } from 'reactstrap';
import { Formik, FieldArray, Form, ErrorMessage } from 'formik';
import { StatementSchema } from '../../../schemas/user/Statement';
import {
	createStatement,
	setEditStatement,
	updateStatement,
} from '../../../features/courses/statementSlice';
import FormErrorMessage from '../../form/FormErrorMessage';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

const StatementForm = ({
	statement,
	user,
	semester,
	teachings,
	courses,
	isEditingStatement,
	editStatementId,
}) => {
	const [selectedCourses, setSelectedCourses] = useState([]);
	const [availableCourses, setAvailableCourses] = useState([]);

	const handleCourseSelect = (courseId) => {
		if (!selectedCourses.includes(courseId)) {
			setSelectedCourses((prevCourses) => [...prevCourses, courseId]);
			setAvailableCourses((prevCourses) =>
				prevCourses.filter((course) => course._id !== courseId)
			);
		}
	};

	const dispatch = useDispatch();

	useEffect(() => {
		setAvailableCourses(courses.filter((course) => !selectedCourses.includes(course._id)));
	}, [courses, selectedCourses]);

	useEffect(() => {
		const storedSelectedCourses = localStorage.getItem('selectedCourses');
		if (storedSelectedCourses) setSelectedCourses(JSON.parse(storedSelectedCourses));
	}, []);

	useEffect(() => {
		localStorage.setItem('selectedCourses', JSON.stringify(selectedCourses));
	}, [selectedCourses]);

	return (
		<>
			<Formik
				initialValues={{
					teaching: [],
				}}
				validationSchema={StatementSchema}
				onSubmit={({ setSubmitting }) => {
					const selectedStatementCourses = selectedCourses.map((courseId) => ({
						_id: courseId,
					}));
					const statement = {
						teaching: selectedStatementCourses,
						semester: semester,
						user: user.user._id,
					};
					if (isEditingStatement) {
						dispatch(
							updateStatement({
								statementId: editStatementId,
								data: statement,
							})
						);
						dispatch(
							setEditStatement({
								isEditingStatement: false,
								editStatementId: '',
							})
						);
						setSubmitting(false);
						localStorage.removeItem('selectedCourses');
						return;
					}
					console.log(statement);
					// dispatch(createStatement(statement));
					setSubmitting(false);
					setSelectedCourses([]);
					localStorage.removeItem('selectedCourses');
				}}
				validateOnMount
			>
				{({ isSubmitting, dirty, handleReset }) => (
					<Form>
						<Row>
							<FormGroup className="text-center">
								<FieldArray name="teaching">
									{({ push }) =>
										availableCourses.map((course) => (
											<small
												key={course._id}
												style={{
													textAlign: 'justify',
													fontWeight: '500',
													fontSize: 15,
												}}
												className="mx-2 pill-label mb-2 clickable"
												onClick={() => {
													push(course._id);
													handleCourseSelect(course._id);
												}}
											>
												{course.title}
											</small>
										))
									}
								</FieldArray>
								<ErrorMessage name="teaching" component={FormErrorMessage} />
							</FormGroup>
						</Row>
						<Row className="mb-3">
							{selectedCourses.map((courseId, index) => {
								const course = courses.find((c) => c._id === courseId);
								if (!course) return null;
								return (
									<Row key={index}>
										<Col xl="6" lg="6" md="12" sm="12" xs="12">
											<label>
												<b>Course ID</b>
											</label>
											<p style={{ textAlign: 'justify' }}>
												{course.courseId}
											</p>
											<hr />
										</Col>
										<Col>
											<label>
												<b>Course Title</b>
											</label>
											<p style={{ textAlign: 'justify' }}>{course.title}</p>
											<hr />
										</Col>
										<Col xl="1">
											<small
												key={course._id}
												style={{
													display: 'inline-flex',
													alignItems: 'center',
													fontWeight: '500',
													fontSize: 15,
												}}
											>
												<FontAwesomeIcon
													className="clickable"
													icon={faCircleXmark}
													onClick={() => {
														setSelectedCourses((prevCourses) =>
															prevCourses.filter(
																(id) => id !== courseId
															)
														);
														setAvailableCourses((prevCourses) => [
															...prevCourses,
															course,
														]);
													}}
												/>
											</small>
										</Col>
									</Row>
								);
							})}
						</Row>

						<Row className="mb-3">
							<Col sm="6" md="6" xs="12" className="text-sm-left text-center">
								<Button
									onClick={() => {
										handleReset();
										setSelectedCourses([]);
										setAvailableCourses(courses);
									}}
									disabled={
										!dirty || isSubmitting || selectedCourses.length === 0
									}
								>
									Clear
								</Button>
							</Col>
							<Col className="text-sm-right text-center mt-sm-0 mt-3">
								<Button type="submit" color="primary" disabled={isSubmitting}>
									{isSubmitting ? (
										<>
											Please wait <Spinner type="grow" size="sm" />
										</>
									) : isEditingStatement ? (
										'Update'
									) : (
										'Create'
									)}
								</Button>
							</Col>
						</Row>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default StatementForm;
