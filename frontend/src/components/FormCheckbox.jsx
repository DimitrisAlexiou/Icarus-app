import { Input } from 'reactstrap';

export const FormCheckbox = ({
	field,
	form: { touched, errors },
	...props
}) => (
	<div>
		<Input type="checkbox" {...field} {...props} />
		{touched[field.name] && errors[field.name] && (
			<div className="mt-2 form-error">{errors[field.name]}</div>
		)}
	</div>
);

export default FormCheckbox;
