import { useCallback, useEffect, useState } from 'react';
import { FormGroup, Row, Col, Button, Spinner } from 'reactstrap';
import { Formik, FieldArray, Form, ErrorMessage } from 'formik';
import { StatementSchema } from '../../../schemas/user/Statement';
import {
	createStatement,
	setEditStatement,
	setEditVaccine,
	updateStatement,
} from '../../../features/courses/statementSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import FormErrorMessage from '../../form/FormErrorMessage';

export default function StatementForm({
	statement,
	user,
	semester,
	type,
	canSubmitAvailableTeachings,
	isEditingStatement,
	isEditingVaccine,
	editStatementId,
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
					teaching: statement ? statement.teaching.map((t) => t._id) : [],
				}}
				enableReinitialize={true}
				validationSchema={StatementSchema}
				onSubmit={(values, { setSubmitting }) => {
					const statement = {
						teachings: selectedTeachings,
						semester: semester._id,
						user: user.user._id,
						type: type,
					};
					if (isEditingStatement || isEditingVaccine)
						dispatch(
							updateStatement({
								statementId: editStatementId,
								data: statement,
							})
						);
					else dispatch(createStatement(statement));

					setSubmitting(false);
					setSelectedTeachings([]);
					setAvailableCourses([]);
					if (isEditingStatement)
						dispatch(
							setEditStatement({
								isEditingStatement: false,
								editStatementId: '',
							})
						);
					else if (isEditingVaccine)
						dispatch(
							setEditVaccine({
								isEditingVaccine: false,
								editStatementId: '',
							})
						);
				}}
				validateOnMount
			>
				{({ isSubmitting, dirty, handleReset }) => (
					<Form>
						<Row>
							{isEditingStatement || isEditingVaccine ? (
								<FormGroup className="text-center">
									<FieldArray name="teaching">
										{({ push }) =>
											availableCourses
												.filter(
													(teaching) =>
														!statement.teaching.some(
															(t) => t._id === teaching._id
														)
												)
												.map((teaching) => (
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
							) : (
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
							)}
						</Row>

						{/* {isEditingStatement || isEditingVaccine ? (
							<Row className="mb-3">
								{statement.teaching.map((teaching, index) => {
									// const teaching = canSubmitAvailableTeachings.find(
									// 	(c) => c._id === teachingId
									// );
									// if (!teaching) return null;
									return (
										<Row key={index}>
											<Col xl="3" lg="3" md="3">
												<label>
													<b>Course ID</b>
												</label>
												<p style={{ textAlign: 'justify' }}>
													{teaching.course.courseId}
												</p>
												<hr />
											</Col>
											<Col lg="8" md="8">
												<label>
													<b>Course Title</b>
												</label>
												<p style={{ textAlign: 'justify' }}>
													{teaching.course.title}
												</p>
												<hr />
											</Col>
											<Col xl="1" lg="1" md="1">
												<small
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
															
														}}
													/>
												</small>
											</Col>
										</Row>
									);
								})}
							</Row>
						) : null} */}

						<Row className="mb-3">
							{selectedTeachings.map((teachingId, index) => {
								const teaching = canSubmitAvailableTeachings.find(
									(c) => c._id === teachingId
								);
								if (!teaching) return null;
								return (
									<Row key={index}>
										<Col xl="3" lg="3" md="3">
											<label>
												<b>Course ID</b>
											</label>
											<p style={{ textAlign: 'justify' }}>
												{teaching.course.courseId}
											</p>
											<hr />
										</Col>
										<Col lg="8" md="8">
											<label>
												<b>Course Title</b>
											</label>
											<p style={{ textAlign: 'justify' }}>
												{teaching.course.title}
											</p>
											<hr />
										</Col>
										<Col xl="1" lg="1" md="1">
											<small
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
									) : isEditingStatement || isEditingVaccine ? (
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
}
