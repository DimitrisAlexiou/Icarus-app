import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

withReactContent(Swal);

export default function Reviews() {
	const [formTeachingData, formInstructorData, setFormData] = useState({
		clear_course_objectives: '',
		course_material: '',
		course_comprehension: '',
		examination_method: '',
		course_difficulty: '',
		course_activities: '',
	});

	const {
		clear_course_objectives,
		course_material,
		course_comprehension,
		examination_method,
		course_difficulty,
		course_activities,
	} = formTeachingData;

	const {
		good_organization,
		clear_comprehensive_answers,
		student_participation,
		course_consistency,
		instructor_approachable,
	} = formInstructorData;

	// const dispatch = useDispatch();

	const { user, isLoading, isSuccess, message } = useSelector(
		(state) => state.auth,
	);

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const [validated, setValidated] = useState(false);

	const onSubmit = (e) => {
		const form = e.target;
		if (form.checkValidity() === false) {
			e.preventDefault();
			e.stopPropagation();
		}
		setValidated(true);

		// e.preventDefault();

		// const ReviewData = {
		// 	clear_course_objectives,
		// 	course_material,
		// 	course_comprehension,
		//  examination_method,
		//  course_difficulty,
		//  course_activities,
		// };

		// dispatch(login(userData));
	};

	return (
		<>
			<div id="wrapper">
				<div id="content-wrapper" className="d-flex flex-column">
					<div id="content">
						<div className="container-fluid">
							<h1 className="h3 mb-5 text-gray-800 font-weight-bold">
								Reviews !
							</h1>

							<div class="row justify-content-center">
								<div class="col-sm-12 col-md-10 col-lg-8 col-xl-6">
									<div class="card shadow mb-4">
										<div class="card-header py-3">
											<h6 class="m-0 font-weight-bold text-primary">
												Teaching Review
											</h6>
										</div>
										<div class="card-body">
											<Form
												className="user validated-form"
												validated={validated}
												onSubmit={onSubmit}
												noValidate
											>
												<Form.Group className="form-floating mb-3">
													<FloatingLabel
														label="Clear course objectives"
														className="text-gray-600"
													>
														<Form.Range
															type="range"
															min="1"
															max="5"
															className="form-control form-range"
															id="clear_course_objectives"
															name="clear_course_objectives"
															value={clear_course_objectives}
															onChange={onChange}
															required
														/>
														<Form.Control.Feedback type="invalid">
															Please give your feedback!
														</Form.Control.Feedback>
													</FloatingLabel>
												</Form.Group>

												<Form.Group className="form-floating mb-3">
													<FloatingLabel
														label="Course material matching the course objectives"
														className="text-gray-600"
													>
														<Form.Range
															type="range"
															min="1"
															max="5"
															className="form-control form-range"
															id="course_material"
															name="course_material"
															value={course_material}
															onChange={onChange}
															required
														/>
														<Form.Control.Feedback type="invalid">
															Please give your feedback!
														</Form.Control.Feedback>
													</FloatingLabel>
												</Form.Group>

												<Form.Group className="form-floating mb-3">
													<FloatingLabel
														label="Better course comprehension due to course material"
														className="text-gray-600"
													>
														<Form.Range
															type="range"
															min="1"
															max="5"
															className="form-control form-range"
															id="course_comprehension"
															name="course_comprehension"
															value={course_comprehension}
															onChange={onChange}
															required
														/>
														<Form.Control.Feedback type="invalid">
															Please give your feedback!
														</Form.Control.Feedback>
													</FloatingLabel>
												</Form.Group>

												<Form.Group className="form-floating mb-3">
													<FloatingLabel
														label="Examination method and grading criteria awareness"
														className="text-gray-600"
													>
														<Form.Range
															type="range"
															min="1"
															max="5"
															className="form-control form-range"
															id="examination_method"
															name="examination_method"
															value={examination_method}
															onChange={onChange}
															required
														/>
														<Form.Control.Feedback type="invalid">
															Please give your feedback!
														</Form.Control.Feedback>
													</FloatingLabel>
												</Form.Group>

												<Form.Group className="form-floating mb-3">
													<FloatingLabel
														label="Course difficulty level resemblance with courses of the same semester"
														className="text-gray-600"
													>
														<Form.Range
															type="range"
															min="1"
															max="5"
															className="form-control form-range"
															id="course_difficulty"
															name="course_difficulty"
															value={course_difficulty}
															onChange={onChange}
															required
														/>
														<Form.Control.Feedback type="invalid">
															Please give your feedback!
														</Form.Control.Feedback>
													</FloatingLabel>
												</Form.Group>

												<Form.Group className="form-floating mb-3">
													<FloatingLabel
														label="The labs/projects/tutorials of the course enabled its better comprehension"
														className="text-gray-600"
													>
														<Form.Range
															type="range"
															min="1"
															max="5"
															className="form-control form-range"
															id="course_activities"
															name="course_activities"
															value={course_activities}
															onChange={onChange}
															required
														/>
														<Form.Control.Feedback type="invalid">
															Please give your feedback!
														</Form.Control.Feedback>
													</FloatingLabel>
												</Form.Group>

												<Button
													type="submit"
													className="btn btn-primary btn-block"
												>
													Review Teaching
												</Button>
											</Form>
										</div>
									</div>
								</div>
							</div>

							<div class="row justify-content-center">
								<div class="col-sm-12 col-md-10 col-lg-8 col-xl-6">
									<div class="card shadow mb-4">
										<div class="card-header py-3">
											<h6 class="m-0 font-weight-bold text-primary">
												Instructor Review
											</h6>
										</div>
										<div class="card-body">
											<Form
												className="user validated-form"
												validated={validated}
												onSubmit={onSubmit}
												noValidate
											>
												<Form.Group className="form-floating mb-3">
													<FloatingLabel
														label="Good organization of presentation material"
														className="text-gray-600"
													>
														<Form.Range
															type="range"
															min="1"
															max="5"
															className="form-control form-range"
															id="good_organization"
															name="good_organization"
															value={good_organization}
															onChange={onChange}
															required
														/>
														<Form.Control.Feedback type="invalid">
															Please give your feedback!
														</Form.Control.Feedback>
													</FloatingLabel>
												</Form.Group>

												<Form.Group className="form-floating mb-3">
													<FloatingLabel
														label="Clear and comprehensive answers/exemplifications/examples given to students"
														className="text-gray-600"
													>
														<Form.Range
															type="range"
															min="1"
															max="5"
															className="form-control form-range"
															id="clear_comprehensive_answers"
															name="clear_comprehensive_answers"
															value={clear_comprehensive_answers}
															onChange={onChange}
															required
														/>
														<Form.Control.Feedback type="invalid">
															Please give your feedback!
														</Form.Control.Feedback>
													</FloatingLabel>
												</Form.Group>

												<Form.Group className="form-floating mb-3">
													<FloatingLabel
														label="Active student participation encouragement"
														className="text-gray-600"
													>
														<Form.Range
															type="range"
															min="1"
															max="5"
															className="form-control form-range"
															id="student_participation"
															name="student_participation"
															value={student_participation}
															onChange={onChange}
															required
														/>
														<Form.Control.Feedback type="invalid">
															Please give your feedback!
														</Form.Control.Feedback>
													</FloatingLabel>
												</Form.Group>

												<Form.Group className="form-floating mb-3">
													<FloatingLabel
														label="Consistency in course obligations"
														className="text-gray-600"
													>
														<Form.Range
															type="range"
															min="1"
															max="5"
															className="form-control form-range"
															id="course_consistency"
															name="course_consistency"
															value={course_consistency}
															onChange={onChange}
															required
														/>
														<Form.Control.Feedback type="invalid">
															Please give your feedback!
														</Form.Control.Feedback>
													</FloatingLabel>
												</Form.Group>

												<Form.Group className="form-floating mb-3">
													<FloatingLabel
														label="Instructor was approachable in general"
														className="text-gray-600"
													>
														<Form.Range
															type="range"
															min="1"
															max="5"
															className="form-control form-range"
															id="instructor_approachable"
															name="instructor_approachable"
															value={instructor_approachable}
															onChange={onChange}
															required
														/>
														<Form.Control.Feedback type="invalid">
															Please give your feedback!
														</Form.Control.Feedback>
													</FloatingLabel>
												</Form.Group>

												<Button
													type="submit"
													className="btn btn-primary btn-block"
												>
													Review Instructor
												</Button>
											</Form>
										</div>
									</div>
								</div>
							</div>

							<div class="row justify-content-center">
								<div class="col-sm-12 col-md-10 col-lg-8 col-xl-6">
									<div class="card shadow mb-4">
										<div class="card-header py-3">
											<h6 class="m-0 font-weight-bold text-primary">
												General Review
											</h6>
										</div>
										<div class="card-body">
											<Form
												className="user validated-form"
												validated={validated}
												onSubmit={onSubmit}
												noValidate
											>
												<Form.Group className="form-floating mb-3">
													<FloatingLabel
														label="Opinion about the course"
														className="text-gray-600"
													>
														<Form.Control
															as="textarea"
															className="form-control"
															style={{ height: '100px' }}
															id="course_opinion"
															name="course_opinion"
															// value={course_opinion}
															onChange={onChange}
															required
														/>
														<Form.Control.Feedback type="invalid">
															Please give your feedback!
														</Form.Control.Feedback>
													</FloatingLabel>
												</Form.Group>

												<Form.Group className="form-floating mb-3">
													<FloatingLabel
														label="Opinion about the instructor(s)"
														className="text-gray-600"
													>
														<Form.Control
															as="textarea"
															className="form-control"
															style={{ height: '100px' }}
															id="instructor_opinion"
															name="instructor_opinion"
															// value={instructor_opinion}
															onChange={onChange}
															required
														/>
														<Form.Control.Feedback type="invalid">
															Please give your feedback!
														</Form.Control.Feedback>
													</FloatingLabel>
												</Form.Group>

												<Form.Group className="form-floating mb-3">
													<FloatingLabel
														label="Likes"
														className="text-gray-600"
													>
														<Form.Control
															as="textarea"
															className="form-control"
															style={{ height: '100px' }}
															id="likes"
															name="likes"
															// value={likes}
															onChange={onChange}
															required
														/>
														<Form.Control.Feedback type="invalid">
															Please give your feedback!
														</Form.Control.Feedback>
													</FloatingLabel>
												</Form.Group>

												<Form.Group className="form-floating mb-3">
													<FloatingLabel
														label="Dislikes"
														className="text-gray-600"
													>
														<Form.Control
															as="textarea"
															className="form-control"
															style={{ height: '100px' }}
															id="dislikes"
															name="dislikes"
															// value={dislikes}
															onChange={onChange}
															required
														/>
														<Form.Control.Feedback type="invalid">
															Please give your feedback!
														</Form.Control.Feedback>
													</FloatingLabel>
												</Form.Group>

												<Button
													type="submit"
													className="btn btn-primary btn-block"
												>
													Review General
												</Button>
											</Form>
										</div>
									</div>
								</div>
							</div>

							<div class="row justify-content-center">
								<div class="col-sm-12 col-md-10 col-lg-8 col-xl-6">
									<div class="card shadow mb-4">
										<div class="card-header py-3">
											<h6 class="m-0 font-weight-bold text-primary">
												Student Review
											</h6>
										</div>
										<div class="card-body">
											<Form
												className="user validated-form"
												validated={validated}
												onSubmit={onSubmit}
												noValidate
											>
												<Form.Group className="form-floating mb-3">
													<FloatingLabel
														label="Opinion about the course"
														className="text-gray-600"
													>
														<Form.Control
															as="textarea"
															className="form-control"
															style={{ height: '100px' }}
															id="course_opinion"
															name="course_opinion"
															// value={course_opinion}
															onChange={onChange}
															required
														/>
														<Form.Control.Feedback type="invalid">
															Please give your feedback!
														</Form.Control.Feedback>
													</FloatingLabel>
												</Form.Group>

												<Form.Group className="form-floating mb-3">
													<FloatingLabel
														label="Weekly study hours"
														className="text-gray-600"
													>
														<Form.Control
															type="text"
															className="form-control"
															id="study_hours"
															name="study_hours"
															// value={study_hours}
															onChange={onChange}
															required
														/>
														<Form.Control.Feedback type="invalid">
															Please give your feedback!
														</Form.Control.Feedback>
													</FloatingLabel>
												</Form.Group>

												<Button
													type="submit"
													className="btn btn-primary btn-block"
												>
													Review Student
												</Button>
											</Form>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
