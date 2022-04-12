import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register, reset } from '../features/auth/authSlice';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/esm/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';

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

export default function Register() {
	const [showPassword, setShowPassword] = useState(false);

	const [formData, setFormData] = useState({
		name: '',
		surname: '',
		email: '',
		username: '',
		password: '',
		confirmPassword: '',
	});

	const { name, surname, username, email, password, confirmPassword } =
		formData;

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { user, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth,
	);

	useEffect(() => {
		if (isError) {
			Toast.fire({
				animation: 'true',
				icon: 'error',
				title: message,
			});
		}

		//? Redirect when logged in
		if (isSuccess || user) {
			navigate('/');
		}

		dispatch(reset);
	}, [isError, isLoading, isSuccess, user, message, navigate, dispatch]);

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

		if (password !== confirmPassword) {
			return Toast.fire({
				animation: true,
				icon: 'error',
				title: 'Passwords do not match',
			});
		} else {
			const userData = {
				name,
				surname,
				username,
				email,
				password,
			};

			dispatch(register(userData));
		}
	};

	return (
		<>
			<div id="wrapper">
				<div id="content-wrapper" className="d-flex flex-column">
					<div id="content">
						<div className="container-fluid">
							<div className="card o-hidden border-0 shadow-lg my-5">
								<div className="card-body p-0">
									<div className="row justify-content-center">
										<div className="col-lg-4 col-xl-5 d-none d-lg-block bg-register-image"></div>
										<div className="col-sm-12 col-md-12 col-lg-8 col-xl-7">
											<div className="p-5">
												<div className="text-center">
													<h1 className="h4 text-gray-900 mb-4">
														Welcome to Icarus Registration Form !
													</h1>
													<h6 className="h6 text-gray-500 mb-3">
														Student Information System
													</h6>
												</div>

												<Form
													className="user validated-form"
													validated={validated}
													onSubmit={onSubmit}
													noValidate
												>
													<Row>
														<Col>
															<Form.Group className="form-floating mb-3">
																<FloatingLabel
																	label="Name"
																	className="text-gray-600"
																>
																	<Form.Control
																		type="text"
																		className="form-control"
																		id="name"
																		name="name"
																		value={name}
																		onChange={onChange}
																		placeholder="Name"
																		required
																	/>
																	<Form.Control.Feedback type="invalid">
																		Please enter your name!
																	</Form.Control.Feedback>
																</FloatingLabel>
															</Form.Group>
														</Col>

														<Col>
															<Form.Group className="form-floating mb-3">
																<FloatingLabel
																	label="Surname"
																	className="text-gray-600"
																>
																	<Form.Control
																		type="text"
																		className="form-control"
																		id="surname"
																		name="surname"
																		value={surname}
																		onChange={onChange}
																		placeholder="Surname"
																		required
																	/>
																	<Form.Control.Feedback type="invalid">
																		Please enter your surname!
																	</Form.Control.Feedback>
																</FloatingLabel>
															</Form.Group>
														</Col>
													</Row>

													<Form.Group className="form-floating mb-3">
														<FloatingLabel
															label="Username"
															className="text-gray-600"
														>
															<Form.Control
																type="text"
																className="form-control"
																id="username"
																name="username"
																value={username}
																onChange={onChange}
																placeholder="Username"
																required
															/>
															<Form.Control.Feedback type="invalid">
																Please provide a username!
															</Form.Control.Feedback>
														</FloatingLabel>
													</Form.Group>

													<Form.Group className="form-floating mb-3">
														<FloatingLabel
															label="Email Address"
															className="text-gray-600"
														>
															<Form.Control
																type="email"
																className="form-control"
																id="email"
																name="email"
																value={email}
																onChange={onChange}
																placeholder="Email Address"
																required
															/>
															<Form.Control.Feedback type="invalid">
																Please provide your email address!
															</Form.Control.Feedback>
														</FloatingLabel>
													</Form.Group>

													<Row>
														<Col>
															<Form.Group className="form-floating mb-3">
																<FloatingLabel
																	label="Password"
																	className="text-gray-600"
																>
																	<Form.Control
																		type={showPassword ? 'text' : 'password'}
																		className="form-control"
																		id="password"
																		name="password"
																		value={password}
																		onChange={onChange}
																		placeholder="Password"
																		required
																	/>
																	<FontAwesomeIcon
																		className="showPassword"
																		icon={faEyeSlash}
																		onClick={() =>
																			setShowPassword((prevState) => !prevState)
																		}
																	/>

																	<Form.Control.Feedback type="invalid">
																		Please provide a password!
																	</Form.Control.Feedback>
																</FloatingLabel>
															</Form.Group>
														</Col>

														<Col>
															<Form.Group className="form-floating mb-3">
																<FloatingLabel
																	label="Confirm Password"
																	className="text-gray-600"
																>
																	<Form.Control
																		type={showPassword ? 'text' : 'password'}
																		className="form-control"
																		id="confirmPassword"
																		name="confirmPassword"
																		value={confirmPassword}
																		onChange={onChange}
																		placeholder="Confirm Password"
																		required
																	/>
																	<FontAwesomeIcon
																		className="showPassword"
																		icon={faEyeSlash}
																		onClick={() =>
																			setShowPassword((prevState) => !prevState)
																		}
																	/>

																	<Form.Control.Feedback type="invalid">
																		Please confirm your given password!
																	</Form.Control.Feedback>
																</FloatingLabel>
															</Form.Group>
														</Col>
													</Row>

													<Button
														type="submit"
														className="btn btn-primary btn-block"
													>
														Register
													</Button>
												</Form>

												<hr />

												<div className="form-group">
													<div className="text-center">
														<button
															type="button"
															className="btn btn-outline-light"
														>
															<Link
																className="small"
																to="/login"
																style={{ textDecoration: 'none' }}
															>
																Already have an account? Login!
															</Link>
														</button>
													</div>
												</div>
											</div>
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
