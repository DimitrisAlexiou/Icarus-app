import { FormGroup, Label, Row, Col, Button, Spinner } from 'reactstrap';
import { Formik, FieldArray, Field, Form, ErrorMessage } from 'formik';
import { CycleEditSchema, CycleSchema } from '../../../schemas/admin/Cycle';
import { defineCycle, setEditCycle, updateCycle } from '../../../features/admin/cyclesSlice';
import { useDispatch } from 'react-redux';
import FormErrorMessage from '../../form/FormErrorMessage';

const CycleForm = ({ cycle, isEditingCycle, editCycleId, setAddingCycle }) => {
	const dispatch = useDispatch();

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
							<FormGroup className="form-floating mb-3" floating>
								<Field type="text" className="form-control" name="cycle" />
								<Label for="cycle" className="text-gray-600">
									Cycle
								</Label>
								<ErrorMessage name="cycle" component={FormErrorMessage} />
							</FormGroup>
						) : (
							<FieldArray name="cycle">
								{({ push, remove }) => (
									<Row>
										<Col md="8" lg="6" xl="8">
											{values.cycle.map((_, index) => (
												<div key={index}>
													<FormGroup
														className="form-floating mb-3"
														key={index}
														floating
													>
														<Field
															type="text"
															className="form-control"
															name={`cycle.${index}`}
														/>
														<Label
															for={`cycle.${index}`}
															className="text-gray-600"
														>
															{!isEditingCycle
																? `Cycle ${index + 1}`
																: `Cycle`}
														</Label>
														<ErrorMessage
															name={`cycle.${index}`}
															component={FormErrorMessage}
														/>
													</FormGroup>
												</div>
											))}
										</Col>
										<Col
											xs="10"
											sm="10"
											md="2"
											lg="5"
											xl="2"
											className="mb-3 text-right"
										>
											{values.cycle.length > 1 ? (
												<Button
													color="warning"
													onClick={() => remove(values.cycle.length - 1)}
													disabled={isSubmitting}
												>
													-
												</Button>
											) : null}
										</Col>
										{!isEditingCycle ? (
											<Col
												xs="2"
												sm="2"
												md="2"
												lg="1"
												xl="2"
												className="mb-3"
											>
												<Button
													color="info"
													onClick={() => push('')}
													disabled={isSubmitting}
												>
													+
												</Button>
											</Col>
										) : null}
									</Row>
								)}
							</FieldArray>
						)}
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
									) : isEditingCycle ? (
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
};

export default CycleForm;
