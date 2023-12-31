import { Row, Spinner } from 'reactstrap';
import { Formik, Form } from 'formik';
import { ActivateAccountSchema } from '../../schemas/auth/ActivateAccount';
import { activateAccount } from '../../features/auth/authSlice';
import TextField from '../form/TextField';
import EmailField from '../form/EmailField';
import ClearButton from '../buttons/ClearButton';
import SubmitButton from '../buttons/SubmitButton';

export default function ContactAdminForm() {
	return (
		<>
			<Formik
				initialValues={{
					email: '',
					username: '',
				}}
				validationSchema={ActivateAccountSchema}
				onSubmit={(values, { setSubmitting }) => {
					const activate = {
						email: values.email,
						username: values.username,
					};
					// dispatch(activateAccount(activate));
					setSubmitting(false);
				}}
				validateOnMount
			>
				{({ isSubmitting, dirty, handleReset }) => (
					<Form>
						<TextField name="username" label="Username" />
						<EmailField name="email" label="Email" />
						<Row>
							<ClearButton
								onClick={() => handleReset()}
								disabled={!dirty || isSubmitting}
							/>
							<SubmitButton
								body={
									isSubmitting ? (
										<>
											Please wait <Spinner type="grow" size="sm" />
										</>
									) : (
										'Request Activation'
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
