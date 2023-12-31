import { FormGroup, Label } from 'reactstrap';
import { Field, ErrorMessage } from 'formik';
import FormErrorMessage from './FormErrorMessage';

const NumberField = ({ id, name, label, min, max, step, disabled }) => {
	return (
		<FormGroup className="form-floating mb-3" floating>
			<Field
				type="number"
				className="form-control"
				id={id}
				min={min}
				max={max}
				step={step}
				name={name}
				disabled={disabled}
			/>
			<Label for={name} className="text-gray-600">
				{label}
			</Label>
			<ErrorMessage name={name} component={FormErrorMessage} />
		</FormGroup>
	);
};

export default NumberField;
