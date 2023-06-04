import { FormGroup, Label, Row, Col, Button, Spinner } from 'reactstrap';
import { Formik, FieldArray, Field, Form, ErrorMessage } from 'formik';
import { CyclesSchema } from '../../schemas/admin/Cycles';
import { defineCycles } from '../../features/admin/cyclesSlice';
import { useDispatch } from 'react-redux';
import FormErrorMessage from '../FormErrorMessage';

const initialValues = {
	cycles: [{ name: '' }],
};

const CycleForm = () => {
	const dispatch = useDispatch();

	const handleSubmit = (values, { setSubmitting, resetForm }) => {
		values.cycles.forEach((cycle) => {
			dispatch(defineCycles(cycle));
			setSubmitting(false);
		});

		resetForm();
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={CyclesSchema}
			onSubmit={handleSubmit}
			validateOnMount
		>
			{({ values, isSubmitting, dirty, handleReset }) => (
				<Form>
					<FormGroup className="form-floating mb-3" floating>
						<FieldArray name="cycles">
							{({ push, remove }) => (
								<Row>
									{values.cycles.map((_, index) => (
										<div key={index}>
											<Label
												for={`cycles[${index}].name`}
												className="text-gray-600"
											>
												Cycle {index + 1}
											</Label>
											<Field
												type="text"
												className="form-control"
												name={`cycles[${index}].name`}
											/>
											<ErrorMessage
												name={`cycles[${index}].name`}
												component={FormErrorMessage}
											/>
											<Col
												xs="10"
												sm="10"
												md="2"
												lg="5"
												xl="2"
												className="mb-3 text-right"
											>
												{index > 0 ? (
													<Button
														color="warning"
														onClick={() => remove(index)}
														disabled={isSubmitting}
													>
														-
													</Button>
												) : null}
											</Col>
										</div>
									))}
									<Col xs="2" sm="2" md="2" lg="1" xl="2" className="mb-3">
										<Button
											color="info"
											onClick={() => push({ name: '' })}
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
								) : (
									'Configure'
								)}
							</Button>
						</Col>
					</Row>
				</Form>
			)}
		</Formik>
	);
};

export default CycleForm;
