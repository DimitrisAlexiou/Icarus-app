import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormGroup, Row, Col, Button, Spinner } from 'reactstrap';
import { Formik, FieldArray, Form, ErrorMessage } from 'formik';
import { StatementSchema } from '../../../schemas/user/Statement';
import {
	createStatement,
	setEditStatement,
	updateStatement,
} from '../../../features/courses/statementSlice';
import {
	addSelectedTeachingsToLocalStorage,
	getSelectedTeachingsFromLocalStorage,
	removeSelectedTeachingsFromLocalStorage,
} from '../../../utils/localStorage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import FormErrorMessage from '../../form/FormErrorMessage';

export default function StatementForm({
	statement,
	user,
	semester,
	availableTeachings,
	isEditingStatement,
	editStatementId,
}) {
	const [selectedTeachings, setSelectedTeachings] = useState([]);
	const [availableCourses, setAvailableCourses] = useState([]);

	const handleTeachingSelect = (teachingId) => {
		if (!selectedTeachings.includes(teachingId)) {
			setSelectedTeachings((prevTeachings) => [...prevTeachings, teachingId]);
			setAvailableCourses((prevTeachings) =>
				prevTeachings.filter((teaching) => teaching._id !== teachingId)
			);
		}
	};

	const dispatch = useDispatch();

	useEffect(() => {
		setAvailableCourses(
			availableTeachings.filter(
				(teaching) => !selectedTeachings.includes(teaching._id)
			)
		);
	}, [availableTeachings, selectedTeachings]);

	useEffect(() => {
		const storedSelectedTeachings = getSelectedTeachingsFromLocalStorage();
		if (storedSelectedTeachings)
			setSelectedTeachings(JSON.parse(storedSelectedTeachings));
	}, []);

	useEffect(() => {
		addSelectedTeachingsToLocalStorage(selectedTeachings);
	}, [selectedTeachings]);

	return (
		<>
			<Formik
				initialValues={{
					teaching: statement ? statement.teaching : [],
				}}
				enableReinitialize={true}
				validationSchema={StatementSchema}
				onSubmit={(values, { setSubmitting }) => {
					const statement = {
						teachings: selectedTeachings,
						semester: semester._id,
						user: user.user._id,
					};
					if (isEditingStatement) {
						dispatch(
							updateStatement({
								statementId: editStatementId,
								data: statement,
							})
						);
						setSubmitting(false);
						setSelectedTeachings([]);
						setAvailableCourses([]);
						removeSelectedTeachingsFromLocalStorage();
						dispatch(
							setEditStatement({
								isEditingStatement: false,
								editStatementId: '',
							})
						);
						return;
					}
					dispatch(createStatement(statement));
					setSubmitting(false);
					setSelectedTeachings([]);
					setAvailableCourses([]);
					removeSelectedTeachingsFromLocalStorage();
				}}
				validateOnMount
			>
				{({ isSubmitting, dirty, handleReset }) => (
					<Form>
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
								const teaching = availableTeachings.find(
									(c) => c._id === teachingId
								);
								if (!teaching) return null;
								return (
									<Row key={index}>
										<Col xl="6" lg="6" md="12" sm="12" xs="12">
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
										setAvailableCourses(availableTeachings);
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
}
