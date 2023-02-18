import { useState, forwardRef } from 'react';
import { Field, ErrorMessage } from 'formik';
import { FormGroup, Button } from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import FormErrorMessage from '../components/FormErrorMessage';

const DateInput = forwardRef(({ value, onClick }, ref) => (
	<Button type="button" color="null" onClick={onClick} ref={ref}>
		{value}
	</Button>
));

export default function EndDatePickerField({ endDate, ...props }) {
	return (
		<>
			<Field name="endDate">
				{({ field, form }) => (
					<FormGroup color="null" className="form-floating mb-3" floating>
						<DatePicker
							selected={field.value}
							onChange={(val) => form.setFieldValue('endDate', val)}
							{...props}
							selectsEnd
							showMonthDropdown
							startDate={endDate}
							dateFormat="dd/MM/yyyy"
							customInput={<DateInput />}
						/>
						<ErrorMessage name="endDate" component={FormErrorMessage} />
					</FormGroup>
				)}
			</Field>
		</>
	);
}
