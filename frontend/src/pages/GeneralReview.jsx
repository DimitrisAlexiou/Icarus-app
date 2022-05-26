import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import {
	createGeneralReview,
	reset,
} from '../features/reviews/generalReviewSlice';
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

export default function GeneralReview() {
	const { user, isAuthenticated, isLoading } = useAuth0();
	const { isError, isSuccess, message } = useSelector(
		(state) => state.generalReview,
	);

	const [formGeneralData, setFormData] = useState({
		course_opinion: '',
		instructor_opinion: '',
		likes: '',
		dislikes: '',
	});

	const { course_opinion, instructor_opinion, likes, dislikes } =
		formGeneralData;

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
		dispatch(createGeneralReview(formGeneralData));
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
							General Review !
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
													type="textarea"
													className="form-control"
													style={{ height: '100px' }}
													id="course_opinion"
													name="course_opinion"
													value={course_opinion}
													onChange={onChange}
													required
												/>
												<Label for="course_opinion" className="text-gray-600">
													Opinion about the course
												</Label>
												<FormFeedback type="invalid">
													Please give your feedback!
												</FormFeedback>
											</FormGroup>

											<FormGroup className="form-floating mb-3" floating>
												<Input
													type="textarea"
													className="form-control"
													style={{ height: '100px' }}
													id="instructor_opinion"
													name="instructor_opinion"
													value={instructor_opinion}
													onChange={onChange}
													required
												/>
												<Label
													for="instructor_opinion"
													className="text-gray-600"
												>
													Opinion about the instructor(s)
												</Label>
												<FormFeedback type="invalid">
													Please give your feedback!
												</FormFeedback>
											</FormGroup>

											<FormGroup className="form-floating mb-3" floating>
												<Input
													type="textarea"
													className="form-control"
													style={{ height: '100px' }}
													id="likes"
													name="likes"
													value={likes}
													onChange={onChange}
													required
												/>
												<Label for="likes" className="text-gray-600">
													Likes
												</Label>
												<FormFeedback type="invalid">
													Please give your feedback!
												</FormFeedback>
											</FormGroup>

											<FormGroup className="form-floating mb-3" floating>
												<Input
													type="textarea"
													className="form-control"
													style={{ height: '100px' }}
													id="dislikes"
													name="dislikes"
													value={dislikes}
													onChange={onChange}
													required
												/>
												<Label for="dislikes" className="text-gray-600">
													Dislikes
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
														Review General
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
