import React from 'react';
import { Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie, faBook, faUserGraduate, faUsers } from '@fortawesome/free-solid-svg-icons';
import CoursesDataTable from '../../components/admin/CoursesDataTable';
import Spinner from '../../components/boilerplate/Spinner';

export default function AdminDashboard() {
	// if (isLoading) {
	// 	return <Spinner />;
	// }

	return (
		<>
			<h1 className="h3 mb-5 text-gray-800 font-weight-bold">Admin Dashboard !</h1>

			<Row>
				<Col xl="3" md="6" className="mb-4">
					<div className="card border-left-primary shadow h-100 py-2">
						<div className="card-body">
							<Row className="no-gutters align-items-center">
								<Col className="mr-2">
									<div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
										Professors
									</div>
									<div className="h5 mb-0 font-weight-bold text-gray-800">
										<p></p>
										17
									</div>
								</Col>
								<div className="col-auto">
									<i className="fas fa-2x text-gray-300">
										<FontAwesomeIcon icon={faUserTie} />
									</i>
								</div>
							</Row>
						</div>
					</div>
				</Col>

				<Col xl="3" md="6" className="mb-4">
					<div className="card border-left-success shadow h-100 py-2">
						<div className="card-body">
							<Row className="no-gutters align-items-center">
								<Col className="mr-2">
									<div className="text-xs font-weight-bold text-success text-uppercase mb-1">
										Courses
									</div>
									<div className="h5 mb-0 font-weight-bold text-gray-800">30</div>
								</Col>
								<div className="col-auto">
									<i className="fas fa-2x text-gray-300">
										<FontAwesomeIcon icon={faBook} />
									</i>
								</div>
							</Row>
						</div>
					</div>
				</Col>

				<Col xl="3" md="6" className="mb-4">
					<div className="card border-left-info shadow h-100 py-2">
						<div className="card-body">
							<Row className="no-gutters align-items-center">
								<Col className="mr-2">
									<div className="text-xs font-weight-bold text-info text-uppercase mb-1">
										Students
									</div>
									<div className="h5 mb-0 font-weight-bold text-gray-800">3</div>
								</Col>
								<div className="col-auto">
									<i className="fas fa-2x text-gray-300">
										<FontAwesomeIcon icon={faUserGraduate} />
									</i>
								</div>
							</Row>
						</div>
					</div>
				</Col>

				<Col xl="3" md="6" className="mb-4">
					<div className="card border-left-dark shadow h-100 py-2">
						<div className="card-body">
							<Row className="no-gutters align-items-center">
								<Col className="mr-2">
									<div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
										Users
									</div>
									<div className="h5 mb-0 font-weight-bold text-gray-800">24</div>
								</Col>
								<div className="col-auto">
									<i className="far fa-2x text-gray-300">
										<FontAwesomeIcon icon={faUsers} />
									</i>
								</div>
							</Row>
						</div>
					</div>
				</Col>
			</Row>

			<Row className="justify-content-center">
				<Col sm="12" md="11" lg="10" xl="8">
					<CoursesDataTable />
				</Col>
			</Row>
		</>
	);
}
