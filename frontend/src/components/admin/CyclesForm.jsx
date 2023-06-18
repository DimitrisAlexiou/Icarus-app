import { useDispatch } from 'react-redux';
import { FormGroup, Label, Row, Col, Button, Spinner } from 'reactstrap';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import { CyclesSchema } from '../../schemas/admin/Cycles';
import { defineCycles, updateCycles } from '../../features/admin/cyclesSlice';
import FormErrorMessage from '../form/FormErrorMessage';

export default function CyclesForm({ cycles, isEditingCycles, editCyclesId }) {
	const dispatch = useDispatch();

	return (
		<>
			<Formik
				initialValues={{
					// names: cycles.map((name) => ({
					// 	cycle: '',
					// })),
					// cycles: [{ name: '' }],
					names: [
						{
							cycle: cycles ? cycles.cycle : '',
						},
					],
				}}
				validationSchema={CyclesSchema}
				onSubmit={(values, { setSubmitting }) => {
					const cycles = {
						names: values.names,
					};
					if (isEditingCycles) {
						dispatch(
							updateCycles({
								cyclesId: editCyclesId,
								data: cycles,
							})
						);
						setSubmitting(false);
						return;
					}
					dispatch(defineCycles(cycles));
					setSubmitting(false);
					// values.cycles.forEach((cycle) => {
					// 	dispatch(defineCycles(cycle));
					// 	setSubmitting(false);
					// });
					// setSubmitting(false);
				}}
				validateOnMount
			>
				{({ isSubmitting, dirty, values, handleReset }) => (
					<Form>
						<FormGroup className="form-floating mb-3" floating>
							<FieldArray name="names">
								{({ push, remove }) => (
									<Row>
										<Col md="8" lg="6" xl="8">
											{values.names.length > 0
												? values.names.map((_, index) => (
														<FormGroup
															className="form-floating mb-3"
															key={index}
															floating
														>
															<Field
																type="text"
																className="form-control"
																name={`names[${index}].cycle`}
															/>
															<Label
																for={`names[${index}].cycle`}
																className="text-gray-600"
															>
																Cycle {index + 1}
															</Label>
															<ErrorMessage
																name={`names[${index}].cycle`}
																component={FormErrorMessage}
															/>
														</FormGroup>
												  ))
												: null}
										</Col>
										<Col
											xs="10"
											sm="10"
											md="2"
											lg="5"
											xl="2"
											className="mb-3 text-right"
										>
											{values.names.length > 1 ? (
												<Button
													color="warning"
													onClick={() => remove(values.names.length - 1)}
													disabled={isSubmitting}
												>
													-
												</Button>
											) : null}
										</Col>
										<Col xs="2" sm="2" md="2" lg="1" xl="2" className="mb-3">
											<Button
												color="info"
												onClick={() =>
													push({
														cycle: '',
													})
												}
												disabled={isSubmitting}
											>
												+
											</Button>
										</Col>
									</Row>
								)}
							</FieldArray>
						</FormGroup>
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
									) : isEditingCycles ? (
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
