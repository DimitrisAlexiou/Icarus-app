import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Badge } from 'reactstrap';
import { Formik, Form } from 'formik';
import { DegreeRulesSchema } from '../../schemas/DegreeRules';
import { Toast } from '../../constants/sweetAlertNotification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faUserTie,
	faBook,
	faUserGraduate,
	faUsers,
} from '@fortawesome/free-solid-svg-icons';
import degreeRulesService from '../../features/rules/degreeRulesService';
import DegreeRulesForm from '../../components/DegreeRulesForm';
import SubmitButton from '../../components/buttons/SubmitButton';
import DatePicker from '../../components/DatePicker';
import CoursesDataTable from '../../components/admin/CoursesDataTable';
import Spinner from '../../components/boilerplate/Spinner';

export default function AdminDashboard() {
	const { isAuthenticated, isLoading } = useAuth0();
	const initialValues = {
		cycles: 0,
		courses: 0,
		cycleCourses: 0,
		practice: false,
	};

	const navigate = useNavigate();

	const onSubmit = async (degreeRulesData) => {
		try {
			await degreeRulesService.assignDegreeRules(degreeRulesData);
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

	if (isLoading) {
		return <Spinner />;
	}

	return (
		isAuthenticated && (
			<>
				<div id="content-wrapper" className="d-flex flex-column">
					<div id="content">
						<div>
							<h1 className="h3 mb-5 text-gray-800 font-weight-bold">
								Admin Dashboard !
							</h1>

							<div class="row">
								<div class="col-xl-3 col-md-6 mb-4">
									<div class="card border-left-primary shadow h-100 py-2">
										<div class="card-body">
											<div class="row no-gutters align-items-center">
												<div class="col mr-2">
													<div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
														Professors
													</div>
													<div class="h5 mb-0 font-weight-bold text-gray-800">
														<p id="professors"></p>
														17
													</div>
												</div>
												<div class="col-auto">
													<i class="fas fa-2x text-gray-300">
														<FontAwesomeIcon icon={faUserTie} />
													</i>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div class="col-xl-3 col-md-6 mb-4">
									<div class="card border-left-success shadow h-100 py-2">
										<div class="card-body">
											<div class="row no-gutters align-items-center">
												<div class="col mr-2">
													<div class="text-xs font-weight-bold text-success text-uppercase mb-1">
														Courses
													</div>
													<div class="h5 mb-0 font-weight-bold text-gray-800">
														30
													</div>
												</div>
												<div class="col-auto">
													<i class="fas fa-2x text-gray-300">
														<FontAwesomeIcon icon={faBook} />
													</i>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div class="col-xl-3 col-md-6 mb-4">
									<div class="card border-left-info shadow h-100 py-2">
										<div class="card-body">
											<div class="row no-gutters align-items-center">
												<div class="col mr-2">
													<div class="text-xs font-weight-bold text-info text-uppercase mb-1">
														Students
													</div>
													<div class="h5 mb-0 font-weight-bold text-gray-800">
														3
													</div>
												</div>
												<div class="col-auto">
													<i class="fas fa-2x text-gray-300">
														<FontAwesomeIcon icon={faUserGraduate} />
													</i>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div class="col-xl-3 col-md-6 mb-4">
									<div class="card border-left-dark shadow h-100 py-2">
										<div class="card-body">
											<div class="row no-gutters align-items-center">
												<div class="col mr-2">
													<div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
														Users
													</div>
													<div class="h5 mb-0 font-weight-bold text-gray-800">
														24
													</div>
												</div>
												<div class="col-auto">
													<i class="far fa-2x text-gray-300">
														<FontAwesomeIcon icon={faUsers} />
													</i>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="row justify-content-center">
								<div className="col-sm-12 col-md-11 col-lg-10 col-xl-8">
									<Badge color="info">Semester</Badge>
									<DatePicker />
								</div>
								<div className="col-sm-12 col-md-11 col-lg-10 col-xl-8">
									<Badge color="info">Grading Duration Window</Badge>
									<DatePicker />
								</div>
							</div>

							<div className="row justify-content-center">
								<div className="col-sm-12 col-md-11 col-lg-10 col-xl-8">
									<Badge color="info">Vaccine/Reassessment Statement</Badge>
									<DatePicker />
								</div>
								<div className="col-sm-12 col-md-11 col-lg-10 col-xl-8">
									<Badge color="info">Assessment Statement</Badge>
									<DatePicker />
								</div>
							</div>

							<div className="row justify-content-center">
								<div className="col-sm-12 col-md-11 col-lg-10 col-xl-8">
									<Badge color="info">Review Duration</Badge>
									<DatePicker />
								</div>
								<div className="col-sm-12 col-md-11 col-lg-10 col-xl-8">
									<Badge color="info">Review Start</Badge>
									<DatePicker />
								</div>
							</div>

							<div className="row justify-content-center">
								<div className="col-sm-12 col-md-11 col-lg-10 col-xl-8">
									<Badge color="info">List of Cycles</Badge>
								</div>
							</div>

							<Formik
								initialValues={initialValues}
								validationSchema={DegreeRulesSchema}
								onSubmit={(degreeRulesData) => {
									onSubmit(degreeRulesData);
								}}
								validateOnMount
							>
								<div className="row justify-content-center">
									<div className="col-sm-12 col-md-11 col-lg-10 col-xl-8">
										<Badge color="info">Rules for Degree</Badge>
										<div className="card shadow mb-4">
											<div className="card-header py-3">
												<h6 className="m-0 font-weight-bold text-primary">
													Fill the form below to assign degree rules
												</h6>
											</div>
											<div className="card-body">
												<Form>
													<DegreeRulesForm initialValues={initialValues} />

													<div className="row">
														{/* <CancelButton url={'/course'} /> */}
														<SubmitButton message={'Assign Rules'} />
													</div>
												</Form>
											</div>
										</div>
									</div>
								</div>
							</Formik>
							<div className="row justify-content-center">
								<div className="col-sm-12 col-md-11 col-lg-10 col-xl-8">
									<CoursesDataTable />
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		)
	);
}
