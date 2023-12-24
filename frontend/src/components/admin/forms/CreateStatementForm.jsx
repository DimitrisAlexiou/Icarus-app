import { useCallback, useEffect, useState } from 'react';
import { Row, Col, Button, Label, FormGroup, Form } from 'reactstrap';
import { ErrorMessage, Field, FieldArray, Formik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { StatementSchema } from '../../../schemas/user/Statement';
import { createStatement } from '../../../features/courses/statementSlice';
import Spinner from '../../../components/boilerplate/spinners/Spinner';
import FormErrorMessage from '../../../components/form/FormErrorMessage';
import Header from '../../boilerplate/Header';

export default function CreateStatementForm({
	students,
	semester,
	type,
	canSubmitAvailableTeachings,
	dispatch,
}) {
	const [selectedTeachings, setSelectedTeachings] = useState([]);
	const [availableCourses, setAvailableCourses] = useState([]);

	const handleTeachingSelect = useCallback(
		(teachingId) => {
			if (!selectedTeachings.includes(teachingId)) {
				setSelectedTeachings((prevTeachings) => [...prevTeachings, teachingId]);
				setAvailableCourses((prevTeachings) =>
					prevTeachings.filter((teaching) => teaching._id !== teachingId)
				);
			}
		},
		[selectedTeachings]
	);

	useEffect(() => {
		setAvailableCourses(
			canSubmitAvailableTeachings.filter(
				(teaching) => !selectedTeachings.includes(teaching._id)
			)
		);
	}, [canSubmitAvailableTeachings, selectedTeachings]);

	return (
		<>
			<Formik
				initialValues={{
					student: '',
					teaching: [],
				}}
				enableReinitialize={true}
				validationSchema={StatementSchema}
				onSubmit={(values, { setSubmitting }) => {
					const statement = {
						teachings: selectedTeachings,
						type: type,
						semester: semester._id,
						user: values.student,
					};
					console.log('Creating statement: ', statement);
					dispatch(createStatement(statement));
					setSubmitting(false);
				}}
				validateOnMount
			>
				{({ isSubmitting, dirty, handleReset }) => (
					<Form>
						<Row className="d-flex justify-content-center">
							<Col xl="8" lg="7">
								<FormGroup className="form-floating mb-3" floating>
									<Field as="select" className="form-control" name="student">
										<option default>Select student</option>
										{students.map((student) => (
											<option key={student._id} value={student._id}>
												{student.user.name} {student.user.surname}
											</option>
										))}
									</Field>
									<Label for="student" className="text-gray-600">
										Student
									</Label>
									<ErrorMessage name="student" component={FormErrorMessage} />
								</FormGroup>
							</Col>
						</Row>
						<Col className="text-center mb-3">
							<Header title="available teachings" />
						</Col>
						<Row>
							<FormGroup className="text-center">
								<FieldArray name="teaching">
									{({ push }) =>
										availableCourses.map((teaching) => (
											<small
												key={teaching._id}
												style={{
													textAlign: 'justify',
													fontWeight: '500',
													fontSize: 15,
												}}
												className="mx-2 pill-label mb-2 clickable"
												onClick={() => {
													push(teaching._id);
													handleTeachingSelect(teaching._id);
												}}
											>
												{teaching.course.title}
											</small>
										))
									}
								</FieldArray>
								<ErrorMessage name="teaching" component={FormErrorMessage} />
							</FormGroup>
						</Row>
						<Row className="mb-3">
							{selectedTeachings.map((teachingId, index) => {
								const teaching = canSubmitAvailableTeachings.find(
									(c) => c._id === teachingId
								);
								if (!teaching) return null;
								return (
									<Row key={index}>
										<Col xl="3">
											<label>
												<b>Course ID</b>
											</label>
											<p style={{ textAlign: 'justify' }}>
												{teaching.course.courseId}
											</p>
											<hr />
										</Col>
										<Col>
											<label>
												<b>Course Title</b>
											</label>
											<p style={{ textAlign: 'justify' }}>
												{teaching.course.title}
											</p>
											<hr />
										</Col>
										<Col xl="1">
											<small
												key={teaching.course._id}
												className="text-danger"
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
														setSelectedTeachings((prevTeachings) =>
															prevTeachings.filter((id) => id !== teachingId)
														);
														setAvailableCourses((prevTeachings) => [
															...prevTeachings,
															teaching,
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
										setSelectedTeachings([]);
										setAvailableCourses(canSubmitAvailableTeachings);
									}}
									disabled={!dirty || isSubmitting || !selectedTeachings.length}
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
}
