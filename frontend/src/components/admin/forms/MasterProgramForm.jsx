import { useMemo } from 'react';
import { FormGroup, Label, Row, Col, Button, Spinner } from 'reactstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {
	defineMaster,
	updateMaster,
	setEditMaster,
} from '../../../features/admin/masterProgramSlice';
import { MasterProgramSchema } from '../../../schemas/admin/MasterProgram';
import {
	academicYearEnd,
	academicYearStart,
} from '../../../utils/academicYears';
import { startOfMonth } from 'date-fns';
import FormErrorMessage from '../../form/FormErrorMessage';

export default function MasterProgramForm({
	master,
	isEditingMaster,
	editMasterId,
	setAddingMaster,
	dispatch,
}) {
	const startDateOptions = useMemo(() => {
		// Replace 'winterSemesters' and 'springSemesters' with your actual data
		const winterSemesters = [
			{ month: 'October', year: academicYearStart },
			{ month: 'November', year: academicYearStart },
			{ month: 'December', year: academicYearStart },
		];
		const springSemesters = [
			{ month: 'February', year: academicYearEnd },
			{ month: 'March', year: academicYearEnd },
			{ month: 'April', year: academicYearEnd },
			{ month: 'May', year: academicYearEnd },
		];

		const options = [];
		// const dateFormat = {
		// 	day: '2-digit',
		// 	month: '2-digit',
		// 	year: 'numeric',
		// };
		// startDate.toLocaleDateString('en-GB', dateFormat);

		winterSemesters.forEach(({ month, year }) => {
			const startDate = startOfMonth(new Date(`${month} 1, ${year}`));
			options.push({
				label: `${month} ${year}`,
				value: startDate,
			});
		});

		springSemesters.forEach(({ month, year }) => {
			const startDate = startOfMonth(new Date(`${month} 1, ${year}`));
			options.push({
				label: `${month} ${year}`,
				value: startDate,
			});
		});

		return options;
	}, []);

	return (
		<>
			<Formik
				initialValues={{
					title: master ? master.title : '',
					startDate: master ? new Date(master.startDate) : '',
					duration: master ? master.duration : 0,
					ects: master ? master.ects : 0,
				}}
				validationSchema={MasterProgramSchema}
				onSubmit={(values, { setSubmitting }) => {
					const master = {
						title: values.title,
						startDate: values.startDate,
						duration: values.duration,
						ects: values.ects,
					};
					console.log(master);
					if (isEditingMaster) {
						dispatch(
							updateMaster({
								masterId: editMasterId,
								data: master,
							})
						);
						dispatch(
							setEditMaster({
								isEditingMaster: false,
								editMasterId: '',
							})
						);
						setSubmitting(false);
						return;
					}
					dispatch(defineMaster(master));
					setAddingMaster(false);
					setSubmitting(false);
				}}
				validateOnMount
			>
				{({ isSubmitting, dirty, handleReset }) => (
					<Form>
						<FormGroup className="form-floating mb-3" floating>
							<Field type="text" className="form-control" name="title" />
							<Label for="title" className="text-gray-600">
								Title
							</Label>
							<ErrorMessage name="title" component={FormErrorMessage} />
						</FormGroup>
						<FormGroup className="form-floating mb-3" floating>
							<Field as="select" name="startDate" className="form-control">
								<option default> Select start date </option>
								{startDateOptions.map((option) => (
									<option
										key={option.value}
										value={option.value}
										label={option.label}
									/>
								))}
							</Field>
							<Label for="startDate" className="text-gray-600">
								Start Date
							</Label>
							<ErrorMessage name="startDate" component={FormErrorMessage} />
						</FormGroup>
						<Row>
							<Col>
								<FormGroup className="form-floating mb-3" floating>
									<Field
										type="number"
										min="1"
										className="form-control"
										name="duration"
									/>
									<Label for="duration" className="text-gray-600">
										Duration
									</Label>
									<ErrorMessage name="duration" component={FormErrorMessage} />
								</FormGroup>
							</Col>
							<Col>
								<FormGroup className="form-floating mb-3" floating>
									<Field
										type="number"
										min="1"
										className="form-control"
										name="ects"
									/>
									<Label for="ects" className="text-gray-600">
										ECTS
									</Label>
									<ErrorMessage name="ects" component={FormErrorMessage} />
								</FormGroup>
							</Col>
						</Row>
						<Row className="mb-3">
							<Col sm="6" md="6" xs="12" className="text-sm-left text-center">
								<Button onClick={handleReset} disabled={!dirty || isSubmitting}>
									Clear
								</Button>
							</Col>
							<Col className="text-sm-right text-center mt-sm-0 mt-3">
								<Button type="submit" color="primary" disabled={isSubmitting}>
									{isSubmitting ? (
										<>
											Please wait <Spinner type="grow" size="sm" />
										</>
									) : isEditingMaster ? (
										'Update'
									) : (
										'Configure'
									)}
								</Button>
							</Col>
						</Row>
					</Form>
				)}
			</Formik>
		</>
	);
}
