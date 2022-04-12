import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

withReactContent(Swal);

export default function Login() {
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
	});

	const { username, email, password } = formData;

	// const navigate = useNavigate();
	const dispatch = useDispatch();

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

		const userData = {
			username,
			email,
			password,
		};

		dispatch(login(userData));
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
										<div className="col-lg-4 col-xl-5 d-none d-lg-block bg-login-image"></div>
										<div className="col-sm-12 col-md-12 col-lg-8 col-xl-7">
											<div className="p-5">
												<div className="text-center">
													<h1 className="h4 text-gray-900 mb-4">
														Welcome Back !
													</h1>
													<h6 className="h6 text-gray-500 mb-3">
														Fill in your credentials
													</h6>
												</div>

												<Form
													className="user validated-form"
													validated={validated}
													onSubmit={onSubmit}
													noValidate
												>
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
																Please enter your username!
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
																Please enter your email address!
															</Form.Control.Feedback>
														</FloatingLabel>
													</Form.Group>

													<Form.Group className="form-floating mb-3">
														<FloatingLabel
															label="Password"
															className="text-gray-600"
														>
															<Form.Control
																type="password"
																className="form-control"
																id="password"
																name="password"
																value={password}
																onChange={onChange}
																placeholder="Password"
																required
															/>
															<Form.Control.Feedback type="invalid">
																Please enter your password!
															</Form.Control.Feedback>
														</FloatingLabel>
													</Form.Group>

													<Button
														type="submit"
														className="btn btn-primary btn-block"
													>
														Login
													</Button>

													<hr />
													<div class="form-group">
														<div class="text-center">
															<button
																type="button"
																class="btn btn-outline-light"
															>
																<Link
																	class="small"
																	to="/register"
																	style={{ textDecoration: 'none' }}
																>
																	Create an Account!
																</Link>
															</button>
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
				</div>
			</div>
		</>
	);
}
