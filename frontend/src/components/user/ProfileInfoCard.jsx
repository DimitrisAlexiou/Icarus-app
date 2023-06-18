import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Badge } from 'reactstrap';
import { faUserTie, faCertificate, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { faCalendarCheck, faIdBadge } from '@fortawesome/free-regular-svg-icons';
import { UserType } from '../../constants/enums';
import img from '../../assets/images/undraw_profile.svg';

export default function ProfileInfoCard({ user }) {
	return (
		<>
			<div className="profile_card">
				<div className="card-body">
					<div className="d-flex flex-column align-items-center text-center">
						<img
							src={img}
							alt="profile_picture"
							className={
								user.user.type === UserType.admin
									? `rounded-circle p-1 bg-danger mb-1`
									: `rounded-circle p-1 bg-primary mb-1`
							}
							width="70"
						/>
						<Col>
							{user.user.isActive === true ? (
								<Badge color="info" pill>
									Active
								</Badge>
							) : (
								<Badge color="warning" pill>
									Inactive
								</Badge>
							)}
						</Col>
						<Col className="mt-3">
							<h6>{user.user.email}</h6>
							<p className="text-secondary font-weight-bold mt-2 mb-1">
								{user.user.type}
							</p>
							<p className="text-star-command-blue mt-3">University of Aegean</p>
						</Col>
					</div>
					{user.user.type === UserType.student ? (
						<>
							<hr />
							<ul className="list-group list-group-flush">
								<li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
									<h6 className="mb-0 text-gray-800">
										<FontAwesomeIcon
											className="mr-2 text-gray-400"
											icon={faIdBadge}
										/>
										Reg. number
									</h6>
									<span className="text-secondary">
										{user.user.student.studentId}
									</span>
								</li>
							</ul>
							<ul className="list-group list-group-flush">
								<li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
									<h6 className="mb-0 text-gray-800">
										<FontAwesomeIcon
											className="mr-2 text-gray-400"
											icon={faCalendarCheck}
										/>
										Admission Year
									</h6>
									<span className="text-secondary">
										{user.user.student.entranceYear}
									</span>
								</li>
							</ul>
							<ul className="list-group list-group-flush">
								<li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
									<h6 className="mb-0 text-gray-800">
										<FontAwesomeIcon
											className="mr-2 text-gray-400"
											icon={faGraduationCap}
										/>
										Student Type
									</h6>
									<span className="text-secondary">
										{user.user.student.studentType}
									</span>
								</li>
							</ul>
						</>
					) : user.user.type === UserType.instructor ? (
						<>
							<hr />
							<ul className="list-group list-group-flush">
								<li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
									<h6 className="mb-0 text-gray-800">
										<FontAwesomeIcon
											className="mr-2 text-gray-400"
											icon={faUserTie}
										/>
										Faculty Type
									</h6>
									<span className="text-secondary">
										{user.user.instructor.facultyType}
									</span>
								</li>
							</ul>
							<ul className="list-group list-group-flush">
								<li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
									<h6 className="mb-0 text-gray-800">
										<FontAwesomeIcon
											className="mr-2 text-gray-400"
											icon={faCertificate}
										/>
										Degree
									</h6>
									<span className="text-secondary">
										{user.user.instructor.degree}
									</span>
								</li>
							</ul>
							<ul className="list-group list-group-flush">
								<li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
									<h6 className="mb-0 text-gray-800">
										<FontAwesomeIcon
											className="mr-2 text-gray-400"
											icon={faCalendarCheck}
										/>
										Entrance Year
									</h6>
									<span className="text-secondary">
										{user.user.instructor.instructorEntranceYear}
									</span>
								</li>
							</ul>
						</>
					) : null}
				</div>
			</div>
		</>
	);
}
