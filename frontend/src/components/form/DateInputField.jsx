import React, { forwardRef } from 'react';
import { Button } from 'reactstrap';

const DateInputField = forwardRef(({ value, onClick }, ref) => {
	return (
		<Button type="button" color="null" onClick={onClick} ref={ref}>
			{value}
		</Button>
	);
});

export default DateInputField;
