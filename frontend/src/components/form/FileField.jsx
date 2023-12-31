import { FormGroup, Label } from 'reactstrap';
import { Field, ErrorMessage } from 'formik';
import FormErrorMessage from './FormErrorMessage';

const FileField = ({ name, label }) => {
	return (
		<FormGroup className="mb-3">
			<Label for={name} className="text-gray-500">
				{label}
			</Label>
			<Field type="file" className="form-control" name={name} />
			<ErrorMessage name={name} component={FormErrorMessage} />
		</FormGroup>
	);
};

export default FileField;
