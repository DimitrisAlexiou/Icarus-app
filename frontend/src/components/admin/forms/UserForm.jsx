import { Row, Col, Spinner } from 'reactstrap';
import { Formik, Form } from 'formik';
import { updateUser } from '../../../features/admin/userSlice';
import {
	Degree,
	FacultyType,
	StudentType,
	UserType,
} from '../../../constants/enums';
import { UserUpdateSchema } from '../../../schemas/admin/UserUpdate';
import moment from 'moment';
import NumberField from '../../form/NumberField';
import TextField from '../../form/TextField';
import EmailField from '../../form/EmailField';
import SelectField from '../../form/SelectField';
import SwitchField from '../../form/SwitchField';
import ClearButton from '../../buttons/ClearButton';
import SubmitButton from '../../buttons/SubmitButton';

export default function UserForm({ user, setModal, editUserId, dispatch }) {
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
					<NumberField min="0" name="entranceYear" label="Entrance Year" />
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
						min="0"
						name="instructorEntranceYear"
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
					username: user ? user.username : '',
					name: user ? user.name : '',
					surname: user ? user.surname : '',
					email: user ? user.email : '',
					type: user ? user.type : '',
					studentId: user && user.student ? user.student.studentId : '',
					studentType: user && user.student ? user.student.studentType : '',
					entranceYear: user && user.student ? user.student.entranceYear : '',
					facultyType:
						user && user.instructor ? user.instructor.facultyType : '',
					degree: user && user.instructor ? user.instructor.degree : '',
					instructorEntranceYear:
						user && user.instructor
							? user.instructor.instructorEntranceYear
							: '',
					isAdmin: user ? user.isAdmin : false,
					loginFailedAttempts: user ? user.loginFailedAttempts : 0,
					lastLogin:
						user && user.lastLogin !== null
							? moment(user.lastLogin).format('DD/MM/YYYY HH:mm:ss')
							: 'inactive',
					createdAt: user
						? moment(user.createdAt).format('DD/MM/YYYY HH:mm:ss')
						: '',
					updatedAt: user
						? moment(user.updatedAt).format('DD/MM/YYYY HH:mm:ss')
						: '',
				}}
				validationSchema={UserUpdateSchema}
				onSubmit={(values, { setSubmitting }) => {
					const user = {
						username: values.username,
						name: values.name,
						surname: values.surname,
						email: values.email,
						type: values.type,
						isAdmin: values.isAdmin,
						loginFailedAttempts: values.loginFailedAttempts,
					};
					if (values.type === UserType.student) {
						user.studentId = values.studentId;
						user.studentType = values.studentType;
						user.entranceYear = values.entranceYear;
					} else if (values.type === UserType.instructor) {
						user.facultyType = values.facultyType;
						user.degree = values.degree;
						user.instructorEntranceYear = values.instructorEntranceYear;
					}
					dispatch(updateUser({ userId: editUserId, data: user }));
					setSubmitting(false);
					setModal(false);
				}}
				validateOnMount
			>
				{({ isSubmitting, dirty, values, handleReset, setFieldValue }) => (
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
							<Col md="5">
								<SelectField
									name="type"
									label="Type"
									disabled={true}
									options={
										<>
											{user.isAdmin ? <option>{UserType.admin}</option> : null}
											<option>{UserType.student}</option>
											<option>{UserType.instructor}</option>
										</>
									}
								/>
							</Col>
							<Col className="text-center mt-3" md="7">
								<SwitchField
									name="isAdmin"
									label="Admin"
									onChange={() => setFieldValue('isAdmin', !values.isAdmin)}
								/>
							</Col>
						</Row>
						<Row>
							<Col md="5">
								<TextField name="createdAt" label="Created" disabled={true} />
							</Col>
							<Col md="7">
								<TextField name="updatedAt" label="Updated" disabled={true} />
							</Col>
						</Row>
						<Row>
							<Col md="5">
								<TextField
									name="lastLogin"
									label="Last Login"
									disabled={true}
								/>
							</Col>
							<Col md="7">
								<NumberField
									min="0"
									max="3"
									name="loginFailedAttempts"
									label="Login Failed Attempts"
								/>
							</Col>
						</Row>
						{user.student ? studentFields : null}
						{user.instructor ? instructorFields : null}
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
										'Update'
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
