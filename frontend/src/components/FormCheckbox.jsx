import { Input } from 'reactstrap';
import { ErrorMessage } from 'formik';
import FormErrorMessage from '../components/FormErrorMessage';

export const FormCheckbox = ({ field, form: { touched, errors }, ...props }) => (
	<div>
		<Input type="checkbox" {...field} {...props} checked={field.value} />
		{touched[field.name] && errors[field.name] && (
			<ErrorMessage name={field.name} component={FormErrorMessage} />
		)}
	</div>
);

export default FormCheckbox;
