import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import {
	createTeachingReview,
	reset,
} from '../features/reviews/teachingReviewSlice';
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

export default function TeachingReview() {
	const { user, isAuthenticated, isLoading } = useAuth0();
	const { isError, isSuccess, message } = useSelector(
		(state) => state.teachingReview,
	);

	const [formTeachingData, setFormData] = useState({
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
		dispatch(createTeachingReview(formTeachingData));
	};

	if (isLoading) {
		return (
			<Spinner color="primary" type="grow">
				Loading...
			</Spinner>
		);
	}

	return (
		// isAuthenticated && (
		// 	<>
		<div id="content-wrapper" className="d-flex flex-column">
			<div id="content">
				<div>
					<h1 className="h3 mb-5 text-gray-800 font-weight-bold">
						Teaching Review !
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
												id="clear_course_objectives"
												name="clear_course_objectives"
												value={clear_course_objectives}
												onChange={onChange}
												required
											/>
											<Label
												for="clear_course_objectives"
												className="text-gray-600"
											>
												Clear course objectives
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
												id="course_material"
												name="course_material"
												value={course_material}
												onChange={onChange}
												required
											/>
											<Label for="course_material" className="text-gray-600">
												Course material matching the course objectives
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
												id="course_comprehension"
												name="course_comprehension"
												value={course_comprehension}
												onChange={onChange}
												required
											/>
											<Label
												for="course_comprehension"
												className="text-gray-600"
											>
												Better course comprehension due to course material
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
												id="examination_method"
												name="examination_method"
												value={examination_method}
												onChange={onChange}
												required
											/>
											<Label for="examination_method" className="text-gray-600">
												Examination method and grading criteria awareness
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
												id="course_difficulty"
												name="course_difficulty"
												value={course_difficulty}
												onChange={onChange}
												required
											/>
											<Label for="course_difficulty" className="text-gray-600">
												Course difficulty level
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
												id="course_activities"
												name="course_activities"
												value={course_activities}
												onChange={onChange}
												required
											/>
											<Label for="course_activities" className="text-gray-600">
												Better course comprehension due to
												labs/projects/tutorials
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
													Review Teaching
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
		// 	</>
		// )
	);
}
