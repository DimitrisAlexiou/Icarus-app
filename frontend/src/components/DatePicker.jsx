import React, { useState, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import { Button } from 'reactstrap';
import 'react-datepicker/dist/react-datepicker.css';

export const DatePick = () => {
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const Input = forwardRef(({ value, onClick }, ref) => (
		<Button className="example-custom-input" onClick={onClick} ref={ref}>
			{value}
		</Button>
	));

	return (
		<>
			<DatePicker
				selected={startDate}
				onChange={(date) => setStartDate(date)}
				selectsStart
				showMonthDropdown
				startDate={startDate}
				endDate={endDate}
				highlightDates={startDate}
				locale="en-GB"
				customInput={<Input />}
				placeholderText="Select semester start date"
			/>

			<DatePicker
				selected={endDate}
				onChange={(date) => setEndDate(date)}
				selectsEnd
				showMonthDropdown
				startDate={startDate}
				endDate={endDate}
				minDate={startDate}
				highlightDates={endDate}
				locale="en-GB"
				customInput={<Input />}
				placeholderText="Select semester end date"
			/>
		</>
	);
};
