import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FormGroup, Label, Row, Col, Button, Spinner } from 'reactstrap';
import { Formik, Form } from 'formik';
import { getCourse, updateCourse, reset } from '../../features/courses/courseSlice';
import { Toast } from '../../constants/sweetAlertNotification';
import { CourseSchema } from '../../schemas/course/Course';
import { Field, ErrorMessage } from 'formik';
import FormErrorMessage from '../../components/form/FormErrorMessage';
import FormCheckbox from '../../components/form/FormCheckbox';
import BackButton from '../../components/buttons/BackButton';
import CustomSpinner from '../../components/boilerplate/Spinner';

export default function CourseEdit() {
	const { course, isError, isSuccess, isLoading, message } = useSelector(
		(state) => state.courses
	);

	const { courseId } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (isError) {
			Toast.fire({
				title: 'Something went wrong!',
				text: message,
				icon: 'error',
			});
		}
		dispatch(getCourse(courseId));
	}, [dispatch, isError, message, courseId]);

	// useEffect(() => {
	//  if (isError) {
	//      Toast.fire({
	//          title: 'Error!',
	//          text: message,
	//          icon: 'error',
	//      });
	//  }
	//  if (isSuccess) {
	//      Toast.fire({
	//          title: 'Success!',
	//          text: message,
	//          icon: 'success',
	//      });
	//      dispatch(reset(editCourse));
	//      navigate('/course/' + courseId);
	//  }
	//  dispatch(reset(editCourse));
	// }, [dispatch, isError, isSuccess, message, courseId, navigate]);

	const onSubmit = async (formCourseData) => {
		// try {
		//  await courseService.updateCourse(formCourseData);
		//  Toast.fire({
		//      title: 'Success',
		//      text: 'Course updated!',
		//      icon: 'success',
		//  });
		//  navigate('/course/' + courseId);
		// } catch (error) {
		//  Toast.fire({
		//      title: 'Error while updating course!',
		//      text: error.response.data,
		//      icon: 'error',
		//  });
		// }
		formCourseData.preventDefault();
		dispatch(updateCourse(courseId, formCourseData));
		navigate('/course/' + courseId);
	};

	if (isLoading) return <CustomSpinner />;

	return (
		<>
			<Row className="mb-5 animated--grow-in">
				<Col sm="6" xs="6" md="6">
					<h1 className="h3 mb-5 text-gray-800 font-weight-bold animated--grow-in">
						Update {course.title}
					</h1>
				</Col>
				<Col className="d-flex justify-content-end">
					<BackButton url={`/course/${courseId}`} />
				</Col>
			</Row>

			<Row className="justify-content-center animated--grow-in">
				<Col sm="12" md="10" lg="8" xl="6">
					<div className="card shadow mb-4">
						<div className="card-header py-3">
							<Row>
								<h6 className="m-0 font-weight-bold text-primary">
									Course Information
								</h6>
							</Row>
						</div>
						<div className="card-body">
							<Formik
								validationSchema={CourseSchema}
								onSubmit={(formCourseData) => {
									onSubmit(formCourseData);
								}}
								validateOnMount
							>
								<Form name="editCourse">
									<Row>
										<Col md="4">
											<FormGroup className="form-floating mb-3" floating>
												<Field
													type="text"
													className="form-control"
													name="cid"
													value={course.courseId}
												/>
												<Label for="cid" className="text-gray-600">
													Course ID
												</Label>
												<ErrorMessage
													name="cid"
													component={FormErrorMessage}
												/>
											</FormGroup>
										</Col>

										{/* <Col md="8">
                                                    <FormGroup className="form-floating mb-3" floating>
                                                        <Field
                                                            type="text"
                                                            className="form-control"
                                                            name="title"
                                                            value={course.title}
                                                        />
                                                        <Label for="title" className="text-gray-600">
                                                            Course Title
                                                        </Label>
                                                        <ErrorMessage
                                                            name="title"
                                                            component={FormErrorMessage}
                                                        />
                                                    </FormGroup>
                                                </Col> */}
									</Row>
									{/* <FormGroup className="form-floating mb-3" floating>
                                                <Field as="select" className="form-control" name="type">
                                                    <option default>Select course type</option>
                                                    <option value={'Undergraduate'}>Undergraduate</option>
                                                    <option value={'Master'}>Master</option>
                                                    <option value={'Mixed'}>Mixed</option>
                                                </Field>
                                                <Label for="type" className="text-gray-600">
                                                    Course Type
                                                </Label>
                                                <ErrorMessage
                                                    name="type"
                                                    component={FormErrorMessage}
                                                />
                                            </FormGroup>
                                            <FormGroup className="form-floating mb-3" floating>
                                                <Field
                                                    as="textarea"
                                                    className="form-control"
                                                    style={{ height: '180px', text_align: 'justify' }}
                                                    name="description"
                                                />
                                                <Label for="description" className="text-gray-600">
                                                    Course Description
                                                </Label>
                                                <ErrorMessage
                                                    name="description"
                                                    component={FormErrorMessage}
                                                />
                                            </FormGroup>
                                            <Row>
                                                <Col md="6">
                                                    <FormGroup className="form-floating mb-3" floating>
                                                        <Field
                                                            as="select"
                                                            className="form-control"
                                                            name="semester"
                                                        >
                                                            <option default>Select course semester</option>
                                                            <option value={'Winter'}>Winter</option>
                                                            <option value={'Spring'}>Spring</option>
                                                            <option value={'Any'}>Any</option>
                                                        </Field>
                                                        <Label for="semester" className="text-gray-600">
                                                            Course Semester
                                                        </Label>
                                                        <ErrorMessage
                                                            name="semester"
                                                            component={FormErrorMessage}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col md="6">
                                                    <FormGroup className="form-floating mb-3" floating>
                                                        <Field
                                                            as="select"
                                                            className="form-control"
                                                            name="year"
                                                        >
                                                            <option default>Select course year</option>
                                                            <option value={'1'}>1</option>
                                                            <option value={'2'}>2</option>
                                                            <option value={'3'}>3</option>
                                                            <option value={'4'}>4</option>
                                                            <option value={'5'}>5</option>
                                                        </Field>
                                                        <Label for="year" className="text-gray-600">
                                                            Course Year
                                                        </Label>
                                                        <ErrorMessage
                                                            name="year"
                                                            component={FormErrorMessage}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md="6">
                                                    <FormGroup className="form-floating mb-3" floating>
                                                        <Field
                                                            as="select"
                                                            min="1"
                                                            max="5"
                                                            className="form-control"
                                                            name="cycle"
                                                        >
                                                            <option default>Select course cycle</option>
                                                            <option value={'Security'}>Security</option>
                                                            <option value={'Software Engineering'}>
                                                                Software Engineering
                                                            </option>
                                                            <option value={'Information Systems'}>
                                                                Information Systems
                                                            </option>
                                                            <option value={'Communication Systems'}>
                                                                Communication Systems
                                                            </option>
                                                            <option value={'AI'}>AI</option>
                                                        </Field>
                                                        <Label for="cycle" className="text-gray-600">
                                                            Course Cycle
                                                        </Label>
                                                        <ErrorMessage
                                                            name="cycle"
                                                            component={FormErrorMessage}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col md="6">
                                                    <FormGroup className="form-floating mb-3" floating>
                                                        <Field
                                                            type="number"
                                                            min="0"
                                                            className="form-control"
                                                            name="ects"
                                                        />
                                                        <Label for="ects" className="text-gray-600">
                                                            Course ECTS
                                                        </Label>
                                                        <ErrorMessage
                                                            name="ects"
                                                            component={FormErrorMessage}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md="6">
                                                    <FormGroup className="mx-1 mb-3" check>
                                                        <Field name="hasLab" component={FormCheckbox} />
                                                        <Label for="hasLab" className="text-gray-500">
                                                            Course Lab
                                                        </Label>
                                                    </FormGroup>
                                                </Col>
                                                <Col md="6">
                                                    <FormGroup className="mx-1 mb-3" check>
                                                        <Field
                                                            name="isObligatory"
                                                            component={FormCheckbox}
                                                        />
                                                        <Label for="isObligatory" className="text-gray-500">
                                                            Obligatory Course
                                                        </Label>
                                                    </FormGroup>
                                                </Col>
                                            </Row> */}

									{/* <Row className="mt-4">
										<Col
											sm="6"
											md="6"
											xs="12"
											className="text-sm-left text-center"
										>
											<Button
												onClick={handleReset}
												disabled={!dirty || isSubmitting}
											>
												Clear
											</Button>
										</Col>
										<Col className="text-sm-right text-center mt-sm-0 mt-3">
											<Button type="submit" color="primary" disabled={isSubmitting || isLoading}>
											{isSubmitting ? (
												<>
													Updating <Spinner type="grow" size="sm" />
												</>
											) : (
												'Update Course'
											)}
										</Button>
										</Col>
									</Row> */}
								</Form>
							</Formik>
						</div>
					</div>
				</Col>
			</Row>
		</>
	);
}
