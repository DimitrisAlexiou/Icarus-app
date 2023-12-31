import { FormGroup, Label } from 'reactstrap';
import { Field, ErrorMessage } from 'formik';
import FormErrorMessage from './FormErrorMessage';

const EmailField = ({ name, label }) => {
	return (
		<FormGroup className="form-floating mb-3" floating>
			<Field type="email" className="form-control" name={name} />
			<Label for={name} className="text-gray-600">
				{label}
			</Label>
			<ErrorMessage name={name} component={FormErrorMessage} />
		</FormGroup>
	);
};

export default EmailField;
