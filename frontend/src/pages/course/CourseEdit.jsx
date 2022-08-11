import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import { useAuth0 } from '@auth0/auth0-react';
import { updateCourse, reset } from '../../features/courses/courseSlice';
import { Toast } from '../../constants/sweetAlertNotification';
import { CourseSchema } from '../../schemas/Course';
// import courseService from '../../features/courses/courseService';
import { FormGroup, Label, Row, Col } from 'reactstrap';
import { Field, ErrorMessage } from 'formik';
import FormErrorMessage from '../../components/FormErrorMessage';
import FormCheckbox from '../../components/FormCheckbox';
import CancelButton from '../../components/buttons/CancelButton';
import SubmitButton from '../../components/buttons/SubmitButton';
import Spinner from '../../components/boilerplate/Spinner';

export default function CourseEdit() {
	const { isAuthenticated, isLoading } = useAuth0();

	const {
		course,
		isSuccess,
		isError,
		isLoading: courseIsLoading,
		message,
	} = useSelector((state) => state.courses);

	const { courseId } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

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
		//      text: 'Course updated successfully!',
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

	if (isLoading || courseIsLoading) {
		return <Spinner />;
	}

	return (
		isAuthenticated && (
			<>
				<Formik
					validationSchema={CourseSchema}
					onSubmit={(formCourseData) => {
						onSubmit(formCourseData);
					}}
					validateOnMount
				>
					<div id="content-wrapper" className="d-flex flex-column">
						<div id="content">
							<div>
								<h1 className="h3 mb-5 text-gray-800 font-weight-bold">
									Update {course.title} Course
								</h1>
								<div className="row justify-content-center">
									<div className="col-sm-12 col-md-10 col-lg-8 col-xl-6">
										<div className="card shadow mb-4">
											<div className="card-header py-3">
												<div className="row">
													<div className="col-6">
														<h6 className="m-0 font-weight-bold text-primary">
															Course Information
														</h6>
													</div>
												</div>
											</div>
											<div className="card-body">
												<Form name="editCourse">
													<Row>
														<Col md="4">
															<FormGroup
																className="form-floating mb-3"
																floating
															>
																<Field
																	type="text"
																	className="form-control"
																	name="cid"
																	value={course.cid}
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

													<div className="row">
														<CancelButton url={`/course/${courseId}`} />
														<SubmitButton message={'Update Course'} />
													</div>
												</Form>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Formik>
			</>
		)
	);
}
