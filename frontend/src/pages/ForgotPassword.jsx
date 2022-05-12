import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, FloatingLabel } from 'reactstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

withReactContent(Swal);

export default function ForgotPassword() {
	const [formData, setFormData] = useState({
		email: '',
	});

	const { email } = formData;

	// const navigate = useNavigate();

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
	};

	return (
		<>
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-xl-10 col-lg-12 col-md-9">
						<div className="card o-hidden border-0 shadow-lg my-5">
							<div className="card-body p-0">
								<div className="row">
									<div className="col-lg-6 d-none d-lg-block bg-password-image"></div>
									<div className="col-sm-12 col-md-12 col-lg-8 col-xl-7">
										<div className="p-5">
											<div className="text-center">
												<h1 className="h4 text-gray-900 mb-2">
													Forgot Your Password?
												</h1>
												<p className="mb-4">
													We get it, stuff happens. Just enter your email
													address below and we'll send you a link to reset your
													password!
												</p>
											</div>

											<Form
												className="user validated-form"
												validated={validated}
												onSubmit={onSubmit}
												noValidate
											>
												<Form.Group className="form-group form-floating">
													<FloatingLabel
														label="Enter Email Address . . ."
														className="text-gray-600"
													>
														<Form.Control
															type="email"
															className="form-control"
															id="email"
															name="email"
															value={email}
															onChange={onChange}
															placeholder="Enter Email Address . . ."
															required
														/>
														<Form.Control.Feedback type="invalid">
															Please provide your email address!
														</Form.Control.Feedback>
													</FloatingLabel>
												</Form.Group>
												<Button
													type="submit"
													className="btn btn-primary btn-block"
												>
													Reset Password
												</Button>

												<hr />

												<div className="form-group row">
													<div className="col-sm-6 mb-3 mb-sm-0">
														<div className="text-center">
															<button
																type="button"
																className="btn btn-outline-light"
															>
																<Link
																	className="small"
																	to="/register"
																	style={{ textDecoration: 'none' }}
																>
																	Create an Account!
																</Link>
															</button>
														</div>
													</div>
													<div className="col-sm-6 mb-3 mb-sm-0">
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
