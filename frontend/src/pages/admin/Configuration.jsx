import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Badge } from 'reactstrap';
import { FormGroup, Label, Row, Col, Button } from 'reactstrap';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import { DegreeRulesSchema } from '../../schemas/admin/DegreeRules';
import { CyclesSchema } from '../../schemas/Cycles';
import { Toast } from '../../constants/sweetAlertNotification';
import configurationService from '../../features/configuration/configurationService';
import DegreeRulesForm from '../../components/DegreeRulesForm';
import SubmitButton from '../../components/buttons/SubmitButton';
import DatePicker from '../../components/DatePicker';
import FormErrorMessage from '../../components/FormErrorMessage';
import Spinner from '../../components/boilerplate/Spinner';

export default function Configuration() {
	const { isAuthenticated, isLoading } = useAuth0();
	const initialDegreeRulesValues = {
		cycles: 0,
		courses: 0,
		cycleCourses: 0,
		practice: false,
	};

	const initialCyclesValues = {
		cycles: [
			{
				type: '',
			},
		],
	};

	const navigate = useNavigate();

	const degreeRulesSubmit = async (degreeRulesData) => {
		try {
			await configurationService.assignDegreeRules(degreeRulesData);
			Toast.fire({
				title: 'Success',
				text: 'Rules assigned successfully!',
				icon: 'success',
			});
			navigate('/admin/dashboard');
		} catch (error) {
			Toast.fire({
				title: 'Error while assigning degree rules!',
				text: error.response.data,
				icon: 'error',
			});
		}
	};

	const CyclesSubmit = async (CyclesData) => {
		try {
			await configurationService.defineCycles(CyclesData);
			Toast.fire({
				title: 'Success',
				text: 'Cycles defined successfully!',
				icon: 'success',
			});
			navigate('/admin/dashboard');
		} catch (error) {
			Toast.fire({
				title: 'Error while defining cycles!',
				text: error.response.data,
				icon: 'error',
			});
		}
	};

	if (isLoading) {
		return <Spinner />;
	}

	return (
		isAuthenticated && (
			<>
				<h1 className="h3 mb-5 text-gray-800 font-weight-bold">Admin Dashboard !</h1>

				<Row className="justify-content-center">
					<div className="col-sm-12 col-md-11 col-lg-10 col-xl-8">
						<Badge color="info">Semester</Badge>
						<DatePicker />
					</div>
					<div className="col-sm-12 col-md-11 col-lg-10 col-xl-8">
						<Badge color="info">Grading Duration Window</Badge>
						<DatePicker />
					</div>
				</Row>

				<Row className="justify-content-center">
					<div className="col-sm-12 col-md-11 col-lg-10 col-xl-8">
						<Badge color="info">Vaccine/Reassessment Statement</Badge>
						<DatePicker />
					</div>
					<div className="col-sm-12 col-md-11 col-lg-10 col-xl-8">
						<Badge color="info">Assessment Statement</Badge>
						<DatePicker />
					</div>
				</Row>

				<Row className="justify-content-center">
					<div className="col-sm-12 col-md-11 col-lg-10 col-xl-8">
						<Badge color="info">Review Duration</Badge>
						<DatePicker />
					</div>
					<div className="col-sm-12 col-md-11 col-lg-10 col-xl-8">
						<Badge color="info">Review Start</Badge>
						<DatePicker />
					</div>
				</Row>

				<Row className="justify-content-center">
					<div className="col-sm-12 col-md-11 col-lg-10 col-xl-8">
						<Badge color="info">List of Cycles</Badge>
						<Formik
							initialValues={initialCyclesValues}
							validationSchema={CyclesSchema}
							onSubmit={(CyclesData) => {
								CyclesSubmit(CyclesData);
							}}
						>
							{({ values }) => (
								<Form>
									<FieldArray name="cycles">
										{({ insert, remove, push }) => (
											<Row>
												{values.cycles.length > 0 &&
													values.cycles.map((cycle, index) => (
														<Row key={index}>
															<Col md="6">
																<FormGroup
																	className="form-floating mb-3"
																	floating
																>
																	<Field
																		type="text"
																		className="form-control"
																		name={`cycles.${index}.type`}
																	/>
																	<Label
																		for={`cycles.${index}.type`}
																		className="text-gray-600"
																	>
																		Type
																	</Label>
																	<ErrorMessage
																		name={`cycles.${index}.type`}
																		component={FormErrorMessage}
																	/>
																</FormGroup>
															</Col>
															<Col>
																<Button
																	onClick={() => remove(index)}
																>
																	-
																</Button>
															</Col>
														</Row>
													))}
												<Button onClick={() => push({ type: '' })}>
													Add Cycle
												</Button>
											</Row>
										)}
									</FieldArray>

									<SubmitButton message={'Define cycles'} />
								</Form>
							)}
						</Formik>
					</div>
				</Row>

				<Row className="justify-content-center">
					<div className="col-sm-12 col-md-11 col-lg-10 col-xl-8">
						<Badge color="info">Rules for Degree</Badge>

						<div className="card shadow mb-4">
							<div className="card-header py-3">
								<h6 className="m-0 font-weight-bold text-primary">
									Fill the form below to assign degree rules
								</h6>
							</div>

							<div className="card-body">
								<Formik
									initialValues={initialDegreeRulesValues}
									validationSchema={DegreeRulesSchema}
									onSubmit={(degreeRulesData) => {
										degreeRulesSubmit(degreeRulesData);
									}}
									validateOnMount
								>
									<Form>
										<DegreeRulesForm initialValues={initialDegreeRulesValues} />

										<Row>
											{/* <CancelButton url={'/course'} /> */}
											<SubmitButton message={'Assign Rules'} />
										</Row>
									</Form>
								</Formik>
							</div>
						</div>
					</div>
				</Row>
			</>
		)
	);
}
