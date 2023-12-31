import { useState } from 'react';
import { Row, Col, Button, Spinner } from 'reactstrap';
import { Formik, Form } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { UserSchema } from '../../schemas/auth/User';
import { register } from '../../features/auth/authSlice';
import { addUser } from '../../features/admin/userSlice';
import {
	UserType,
	StudentType,
	Degree,
	FacultyType,
} from '../../constants/enums';
import NumberField from '../form/NumberField';
import TextField from '../form/TextField';
import EmailField from '../form/EmailField';
import SelectField from '../form/SelectField';
import PasswordField from '../form/PasswordField';
import ClearButton from '../buttons/ClearButton';
import SubmitButton from '../buttons/SubmitButton';

export default function RegisterForm({ newUser, setNewUser, dispatch }) {
	const [showPassword, setShowPassword] = useState(false);
	const [selectedType, setSelectedType] = useState('');

	const handleTypeChange = (e) => {
		setSelectedType(e.target.value);
	};

	const studentFields = (
		<>
			<Row>
				<Col md="5">
					<TextField name="studentId" label="Student ID" />
				</Col>
				<Col md="7">
					<SelectField
						name="studentType"
						label="Student Type"
						options={
							<>
								<option className="text-gray-300" default>
									Select student type
								</option>
								<option value={StudentType.Undergraduate}>
									{StudentType.Undergraduate}
								</option>
								<option value={StudentType.Master}>{StudentType.Master}</option>
								<option value={StudentType.PhD}>{StudentType.PhD}</option>
							</>
						}
					/>
				</Col>
			</Row>
			<Row>
				<Col md="5">
					<NumberField name="entranceYear" min="0" label="Entrance Year" />
				</Col>
			</Row>
		</>
	);

	const instructorFields = (
		<>
			<Row>
				<Col md="5">
					<SelectField
						name="facultyType"
						label="Faculty Type"
						options={
							<>
								<option className="text-gray-300" default>
									Select faculty type
								</option>
								<option value={FacultyType.DEP}>{FacultyType.DEP}</option>
								<option value={FacultyType.EDIP}>{FacultyType.EDIP}</option>
								<option value={FacultyType.ETEP}>{FacultyType.ETEP}</option>
							</>
						}
					/>
				</Col>
				<Col md="7">
					<SelectField
						name="degree"
						label="Degree"
						options={
							<>
								<option className="text-gray-300" default>
									Select degree type
								</option>
								<option value={Degree.Assistant}>{Degree.Assistant}</option>
								<option value={Degree.Associate}>{Degree.Associate}</option>
								<option value={Degree.Professor}>{Degree.Professor}</option>
							</>
						}
					/>
				</Col>
			</Row>
			<Row>
				<Col md="5">
					<NumberField
						name="instructorEntranceYear"
						min="0"
						label="Entrance Year"
					/>
				</Col>
			</Row>
		</>
	);

	return (
		<>
			<Formik
				initialValues={{
					name: '',
					surname: '',
					username: '',
					email: '',
					password: '',
					confirmPassword: '',
					type: '',
					studentId: '',
					studentType: '',
					entranceYear: '',
					facultyType: '',
					degree: '',
					instructorEntranceYear: '',
				}}
				validationSchema={UserSchema}
				onSubmit={(values, { setSubmitting }) => {
					if (values.type === UserType.student) {
						const user = {
							name: values.name,
							surname: values.surname,
							username: values.username,
							email: values.email,
							password: values.password,
							type: values.type,
							studentId: values.studentId,
							studentType: values.studentType,
							entranceYear: values.entranceYear,
						};
						if (newUser) {
							dispatch(addUser(user));
							setSubmitting(false);
							setNewUser(false);
							return;
						}
						dispatch(register(user));
						setSubmitting(false);
					} else if (values.type === UserType.instructor) {
						const user = {
							name: values.name,
							surname: values.surname,
							username: values.username,
							email: values.email,
							password: values.password,
							type: values.type,
							facultyType: values.facultyType,
							degree: values.degree,
							instructorEntranceYear: values.instructorEntranceYear,
						};
						if (newUser) {
							dispatch(addUser(user));
							setSubmitting(false);
							setNewUser(false);
							return;
						}
						dispatch(register(user));
						setSubmitting(false);
					}
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
						<Row>
							<Col md="5" sm="10" xs="10">
								<PasswordField
									name="password"
									label="Password"
									type={showPassword ? 'text' : 'password'}
								/>
							</Col>
							<Col
								md="1"
								sm="1"
								xs="1"
								className="mb-3 d-flex justify-content-center"
							>
								<Button
									type="button"
									className="nav-link align-items-center"
									color="null"
								>
									<FontAwesomeIcon
										icon={faEyeSlash}
										onClick={() => setShowPassword(!showPassword)}
									/>
								</Button>
							</Col>
							<Col md="6">
								<PasswordField
									name="confirmPassword"
									label="Confirm Password"
									type={showPassword ? 'text' : 'password'}
								/>
							</Col>
						</Row>
						<Row>
							<Col md="5">
								<SelectField
									name="type"
									label="Type"
									options={
										<>
											<option className="text-gray-300" default>
												Select your role
											</option>
											<option value={UserType.student}>
												{UserType.student}
											</option>
											<option value={UserType.instructor}>
												{UserType.instructor}
											</option>
										</>
									}
									onClick={handleTypeChange}
								/>
							</Col>
						</Row>
						{selectedType === UserType.student ? studentFields : null}
						{selectedType === UserType.instructor ? instructorFields : null}
						<Row>
							<ClearButton
								onClick={() => {
									handleReset();
									setSelectedType('');
									setShowPassword(false);
								}}
								disabled={!dirty || isSubmitting}
							/>
							<SubmitButton
								body={
									isSubmitting ? (
										<>
											Please wait <Spinner type="grow" size="sm" />
										</>
									) : newUser ? (
										'Add User'
									) : (
										'Register'
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
