import { Row, Col, Button, Spinner } from 'reactstrap';
import { Formik, FieldArray, Form } from 'formik';
import { CycleEditSchema, CycleSchema } from '../../../schemas/admin/Cycle';
import {
	defineCycle,
	setEditCycle,
	updateCycle,
} from '../../../features/admin/cyclesSlice';
import TextField from '../../form/TextField';
import ClearButton from '../../buttons/ClearButton';
import SubmitButton from '../../buttons/SubmitButton';

const CycleForm = ({
	cycle,
	isEditingCycle,
	editCycleId,
	setAddingCycle,
	dispatch,
}) => {
	return (
		<>
			<Formik
				initialValues={{ cycle: cycle ? cycle.cycle : [''] }}
				validationSchema={isEditingCycle ? CycleEditSchema : CycleSchema}
				onSubmit={(values, { setSubmitting }) => {
					const cycle = {
						cycle: values.cycle,
					};
					if (isEditingCycle) {
						dispatch(
							updateCycle({
								cycleId: editCycleId,
								data: cycle,
							})
						);
						dispatch(
							setEditCycle({
								isEditingCycle: false,
								editCycleId: '',
							})
						);
						setSubmitting(false);
						return;
					}
					dispatch(defineCycle(cycle));
					setAddingCycle(false);
					setSubmitting(false);
				}}
				validateOnMount
			>
				{({ isSubmitting, dirty, values, handleReset }) => (
					<Form>
						{isEditingCycle ? (
							<TextField name="cycle" label="Cycle" />
						) : (
							<FieldArray name="cycle">
								{({ push, remove }) => (
									<>
										<div className="mb-3">
											{!isEditingCycle ? (
												<Button
													color="info"
													onClick={() => push('')}
													disabled={isSubmitting}
												>
													+
												</Button>
											) : null}
										</div>
										<Row>
											{values.cycle.map((_, index) => (
												<Row key={index}>
													<Col xs="11" sm="11" md="11" lg="11" xl="11">
														<TextField name={`cycle.${index}`} label="Cycle" />
													</Col>
													{values.cycle.length > 1 ? (
														<Col
															xs="1"
															sm="1"
															md="1"
															lg="1"
															xl="1"
															className="mb-3"
														>
															<Button
																color="warning"
																onClick={() => remove(index)}
																disabled={isSubmitting}
															>
																-
															</Button>
														</Col>
													) : null}
												</Row>
											))}
										</Row>
									</>
								)}
							</FieldArray>
						)}
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
									) : isEditingCycle ? (
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
};

export default CycleForm;
