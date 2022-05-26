import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import {
	createInstructorReview,
	reset,
} from '../features/reviews/instructorReviewSlice';
import {
	Form,
	FormGroup,
	FormFeedback,
	Button,
	Input,
	Label,
	Spinner,
} from 'reactstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);
const Toast = MySwal.mixin({
	toast: true,
	position: 'top-right',
	iconColor: 'white',
	customClass: {
		popup: 'colored-toast',
	},
	showConfirmButton: false,
	timer: 1500,
	timerProgressBar: true,
});

export default function InstructorReview() {
	const { user, isAuthenticated, isLoading } = useAuth0();
	const { isError, isSuccess, message } = useSelector(
		(state) => state.instructorReview,
	);

	const [formInstructorData, setFormData] = useState({
		good_organization: '',
		clear_comprehensive_answers: '',
		student_participation: '',
		course_consistency: '',
		instructor_approachable: '',
	});

	const {
		good_organization,
		clear_comprehensive_answers,
		student_participation,
		course_consistency,
		instructor_approachable,
	} = formInstructorData;

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const [validated, setValidated] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (isError) {
			Toast.fire({
				animation: 'true',
				title: 'Error!',
				text: message,
				icon: 'error',
			});
		}
		if (isSuccess) {
			Toast.fire({
				animation: 'true',
				title: 'Success!',
				text: message,
				icon: 'success',
			});
			dispatch(reset());
			navigate('/review');
		}
		dispatch(reset());
	}, [dispatch, isError, isSuccess, message, navigate]);

	const onSubmit = (e) => {
		const form = e.target;
		if (form.checkValidity() === false) {
			e.preventDefault();
			e.stopPropagation();
		}
		setValidated(true);
		dispatch(createInstructorReview(formInstructorData));
	};

	if (isLoading) {
		return (
			<Spinner color="primary" type="grow">
				Loading...
			</Spinner>
		);
	}

	return (
		<>
			<div id="content-wrapper" className="d-flex flex-column">
				<div id="content">
					<div>
						<h1 className="h3 mb-5 text-gray-800 font-weight-bold">
							Instructor Review !
						</h1>

						<div className="row justify-content-center">
							<div className="col-sm-12 col-md-10 col-lg-8 col-xl-6">
								<div className="card shadow mb-4">
									<div className="card-header py-3">
										<h6 className="m-0 font-weight-bold text-primary">
											Leave your review
										</h6>
									</div>
									<div className="card-body">
										<Form
											className="user validated-form"
											validated={validated}
											onSubmit={onSubmit}
											noValidate
										>
											<FormGroup className="form-floating mb-3" floating>
												<Input
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
												<Label
													for="good_organization"
													className="text-gray-600"
												>
													Good organization of presentation material
												</Label>
												<FormFeedback type="invalid">
													Please give your feedback!
												</FormFeedback>
											</FormGroup>

											<FormGroup className="form-floating mb-3" floating>
												<Input
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
												<Label
													for="clear_comprehensive_answers"
													className="text-gray-600"
												>
													Clear and comprehensive
													answers/exemplifications/examples
												</Label>
												<FormFeedback type="invalid">
													Please give your feedback!
												</FormFeedback>
											</FormGroup>

											<FormGroup className="form-floating mb-3" floating>
												<Input
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
												<Label
													for="student_participation"
													className="text-gray-600"
												>
													Active student participation encouragement
												</Label>
												<FormFeedback type="invalid">
													Please give your feedback!
												</FormFeedback>
											</FormGroup>

											<FormGroup className="form-floating mb-3" floating>
												<Input
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
												<Label
													for="course_consistency"
													className="text-gray-600"
												>
													Consistency in course obligations
												</Label>
												<FormFeedback type="invalid">
													Please give your feedback!
												</FormFeedback>
											</FormGroup>

											<FormGroup className="form-floating mb-3" floating>
												<Input
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
												<Label
													for="instructor_approachable"
													className="text-gray-600"
												>
													Instructor was approachable in general
												</Label>
												<FormFeedback type="invalid">
													Please give your feedback!
												</FormFeedback>
											</FormGroup>

											<div className="form-group row">
												<div className="col-sm-6 mb-3 mb-sm-0">
													<Link to="/review">
														<Button>Cancel</Button>
													</Link>
												</div>
												<div className="col-sm-6 mb-3 mb-sm-0 text-right">
													<Button type="submit" color="primary">
														Review Instructor
													</Button>
												</div>
											</div>
										</Form>
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
