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

export default function StartDatePickerField({ startDate, setEndDate, ...props }) {
	return (
		<>
			<Field name="startDate">
				{({ field, form }) => (
					<FormGroup className="form-floating mb-3" floating>
						<DatePicker
							selected={field.value}
							onChange={(val) => form.setFieldValue('startDate', val)}
							{...props}
							selectsStart
							showMonthDropdown
							startDate={startDate}
							endDate={setEndDate(field.value)}
							highlightDates={startDate}
							dateFormat="dd/MM/yyyy"
							customInput={<DateInput />}
						/>
						<ErrorMessage name="startDate" component={FormErrorMessage} />
					</FormGroup>
				)}
			</Field>
		</>
	);
}
