import { useMemo } from 'react';
import { Row, Col, Spinner } from 'reactstrap';
import { Formik, Form } from 'formik';
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
import NumberField from '../../form/NumberField';
import TextField from '../../form/TextField';
import SelectField from '../../form/SelectField';
import ClearButton from '../../buttons/ClearButton';
import SubmitButton from '../../buttons/SubmitButton';

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
						<TextField name="title" label="Title" />
						<SelectField
							name="startDate"
							label="Start Date"
							options={
								<>
									<option className="text-gray-300" default>
										Select start date
									</option>
									{startDateOptions.map((option) => (
										<option
											key={option.value}
											value={option.value}
											label={option.label}
										/>
									))}
								</>
							}
						/>
						<Row>
							<Col>
								<NumberField name="duration" min="1" label="Duration" />
							</Col>
							<Col>
								<NumberField name="ects" min="1" label="ECTS" />
							</Col>
						</Row>
						<Row className="mb-3">
							<ClearButton
								onClick={handleReset}
								disabled={!dirty || isSubmitting}
							/>
							<SubmitButton
								body={
									isSubmitting ? (
										<>
											Please wait <Spinner type="grow" size="sm" />
										</>
									) : isEditingMaster ? (
										'Update'
									) : (
										'Configure'
									)
								}
								disabled={isSubmitting}
							/>
						</Row>
					</Form>
				)}
			</Formik>
		</>
	);
}
