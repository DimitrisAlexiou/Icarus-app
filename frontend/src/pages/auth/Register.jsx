import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Formik, Form } from 'formik';
import { UserSchema } from '../../schemas/User';
import { Toast } from '../../constants/sweetAlertNotification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import registerUser from '../../features/auth/userService';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import RegisterForm from '../../components/auth/RegisterForm';
import SubmitButton from '../../components/buttons/SubmitButton';
import SignUpInButton from '../../components/buttons/SignUpInButton';

export default function Register() {
	const { user, isError, isLoading, isSuccess, message } = useSelector((state) => state.user);

	const initialValues = {
		username: '',
		email: '',
		password: '',
	};

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onSubmit = async (userData) => {
		userData.preventDefault();
		try {
			// await userService.registerUser(userData);
			const auth = getAuth();
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				userData.email,
				userData.password
			);
			const user = userCredential.user;
			updateProfile(auth.currentUser, {
				displayName: userData.username,
			});
			dispatch(registerUser(userData));
			Toast.fire({
				title: 'Success',
				text: 'Account created successfully!',
				icon: 'success',
			});
			navigate('/');
		} catch (error) {
			Toast.fire({
				title: 'Error while creating account!',
				text: error.response.data,
				icon: 'error',
			});
		}
	};

	useEffect(() => {
		if (user) {
			navigate('/');
		}
	}, [user, navigate]);

	return (
		<>
			<Formik
				initialValues={initialValues}
				validationSchema={UserSchema}
				onSubmit={(userData) => {
					onSubmit(userData);
				}}
				validateOnMount
			>
				<div className="bg-gradient-primary">
					<div className="container">
						<div className="row justify-content-center">
							<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
								<div className="card o-hidden border-0 shadow-lg my-5">
									<div className="card-body p-0">
										<div className="row">
											<div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
											<div className="col-lg-7">
												<div className="p-5">
													<div className="text-center">
														<h1 className="h4 text-gray-900 mb-4 justify-content-center">
															Create Account !
														</h1>
													</div>
													<Form className="Register" onSubmit={onSubmit}>
														<RegisterForm
															initialValues={initialValues}
														/>

														<div className="form-group row">
															<SubmitButton
																message={'Register'}
																disabled={isLoading}
															/>
														</div>
													</Form>
													<hr />
													<div className="d-flex justify-content-center">
														<SignUpInButton
															icon={''}
															message={'Continue with '}
														/>
														<FontAwesomeIcon icon={faGoogle} />
													</div>
													<div className="d-flex justify-content-center">
														<SignUpInButton
															icon={''}
															message={'Continue with '}
														/>
														<FontAwesomeIcon icon={faGithub} />
													</div>
													<hr />
													<div className="d-flex justify-content-center">
														<Link
															to="/auth/login"
															style={{
																textDecoration: 'none',
																textAlign: 'center',
															}}
														>
															Already have an account? Login!
														</Link>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="text-center">
								<Link
									to="/"
									className="col-xs-2 col-sm-2 col-md-2 col-lg-2 mb-sm-0 mb-3"
								>
									<Button>Landing Page</Button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</Formik>
		</>
	);
}
