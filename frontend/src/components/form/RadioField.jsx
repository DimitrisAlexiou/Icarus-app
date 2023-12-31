import { FormGroup, Input, Label } from 'reactstrap';

const RadioField = ({ name, value, label, onChange, checked, disabled }) => {
	return (
		<FormGroup className="mx-1" check>
			<Input
				type="radio"
				name={name}
				value={value}
				checked={checked}
				onChange={onChange}
				disabled={disabled}
			/>
			<Label for={name} className="mx-2 text-gray-500">
				{label}
			</Label>
		</FormGroup>
	);
};

export default RadioField;
