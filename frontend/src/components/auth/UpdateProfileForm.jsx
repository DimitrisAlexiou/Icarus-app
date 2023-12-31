import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import { Row, Col, Spinner } from 'reactstrap';
import { UserProfileSchema } from '../../schemas/UserProfile';
import { updateProfile } from '../../features/auth/authSlice';
import { Degree, UserType } from '../../constants/enums';
import TextField from '../form/TextField';
import EmailField from '../form/EmailField';
import SelectField from '../form/SelectField';
import ClearButton from '../buttons/ClearButton';
import SubmitButton from '../buttons/SubmitButton';

export default function UpdateProfileForm({ user }) {
	const dispatch = useDispatch();

	return (
		<>
			<Formik
				initialValues={{
					name: user.user.name,
					surname: user.user.surname,
					username: user.user.username,
					email: user.user.email,
					degree:
						user.user.type === UserType.instructor
							? user.user.instructor.degree
							: '',
				}}
				validationSchema={!user.user.isAdmin ? UserProfileSchema : null}
				onSubmit={(values, { setSubmitting }) => {
					const userToUpdate = {
						name: values.name,
						surname: values.surname,
						username: values.username,
						email: values.email,
						type: user.user.type,
					};
					if (user.user.type === UserType.instructor)
						userToUpdate.degree = values.degree;
					dispatch(
						updateProfile({ userId: user.user._id, data: userToUpdate })
					);
					setSubmitting(false);
				}}
				validateOnMount
			>
				{({ isSubmitting, dirty, handleReset }) => (
					<Form>
						<Row>
							<Col md="5">
								<TextField name="name" label="Name" />
							</Col>
							<Col md="7">
								<TextField name="surname" label="Surname" />
							</Col>
						</Row>
						<Row>
							<Col md="5">
								<TextField name="username" label="Username" />
							</Col>
							<Col md="7">
								<EmailField name="email" label="Email" />
							</Col>
						</Row>
						{user.user.type === UserType.instructor ? (
							<Row>
								<Col md="5">
									<SelectField
										name="degree"
										label="Degree"
										options={
											<>
												<option className="text-gray-300" default>
													{user.user.instructor.degree}
												</option>
												<option value={Degree.Assistant}>
													{Degree.Assistant}
												</option>
												<option value={Degree.Associate}>
													{Degree.Associate}
												</option>
												<option value={Degree.Professor}>
													{Degree.Professor}
												</option>
											</>
										}
									/>
								</Col>
							</Row>
						) : null}
						<Row>
							<ClearButton
								onClick={handleReset}
								disabled={!dirty || isSubmitting}
							/>
							<SubmitButton
								body={
									isSubmitting ? (
										<>
											Updating <Spinner type="grow" size="sm" />
										</>
									) : (
										'Update Profile'
									)
								}
								disabled={isSubmitting}
							/>
						</Row>
					</Form>
				)}
			</Formik>
		</>
	);
}
