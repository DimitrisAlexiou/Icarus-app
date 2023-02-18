import { useState } from 'react';
import { FormGroup, Label, Row, Col, Button } from 'reactstrap';
import { Form, Field, ErrorMessage } from 'formik';
import FormErrorMessage from '../FormErrorMessage';
import SubmitButton from '../buttons/SubmitButton';
import StartDatePickerField from '../StartDatePickerField';
import EndDatePickerField from '../EndDatePickerField';

export default function SemesterForm({ semester, isSubmitting, dirty, handleReset }) {
	const [startDate] = useState(new Date());
	const [endDate, setEndDate] = useState(startDate);

	return (
		<>
			<Form>
				<FormGroup className="form-floating mb-3" floating>
					<Field as="select" className="form-control" name="type">
						<option default>Select semester type</option>
						<option value={'Winter'}>Winter</option>
						<option value={'Spring'}>Spring</option>
						<option value={'Any'}>Any</option>
					</Field>
					<Label for="type" className="text-gray-600">
						Semester type
					</Label>
					<ErrorMessage name="type" component={FormErrorMessage} />
				</FormGroup>
				<Row>
					<Col xl="6" lg="6" md="6" sm="6" xs="12">
						<StartDatePickerField startDate={startDate} setEndDate={setEndDate} />
					</Col>
					<Col xl="6" lg="6" md="6" sm="6" xs="12" className="text-right">
						<EndDatePickerField endDate={endDate} />
					</Col>
				</Row>
				<Row>
					<Col className="mb-3">
						<Button onClick={handleReset} disabled={!dirty || isSubmitting}>
							Clear
						</Button>
					</Col>
					{!semester ? (
						<Col className="text-right px-0">
							<SubmitButton
								color={'danger'}
								message={'Delete Semester'}
								disabled={isSubmitting}
							/>
						</Col>
					) : (
						<Col className="text-right px-0">
							<SubmitButton
								color={'primary'}
								message={'Define period'}
								disabled={isSubmitting}
							/>
						</Col>
					)}
				</Row>
			</Form>
		</>
	);
}
