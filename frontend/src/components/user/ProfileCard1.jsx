import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Badge } from 'reactstrap';
import {
	faCalendarCheck,
	faGraduationCap,
	faIdBadge,
	faUserTie,
	faCertificate,
} from '@fortawesome/free-solid-svg-icons';
import img from '../../assets/images/undraw_profile.svg';

export default function ProfileCard1({ user }) {
	return (
		<>
			<div className="profile_card">
				<div className="card-body">
					<div className="d-flex flex-column align-items-center text-center">
						<img
							src={img}
							alt="profile_picture"
							className="rounded-circle p-1 bg-primary mb-1"
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
							<p className="text-secondary mb-1">{user.user.type}</p>
							<p className="text-muted mt-3">University of Aegean</p>
						</Col>
					</div>
					<hr />
					{user.user.type === 'Student' ? (
						<>
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
										{user.userType.studentId}
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
										{user.userType.entranceYear}
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
										{user.userType.studentType}
									</span>
								</li>
							</ul>
						</>
					) : (
						<>
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
										{user.userType.facultyType}
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
									<span className="text-secondary">{user.userType.degree}</span>
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
										{user.userType.instructorEntranceYear}
									</span>
								</li>
							</ul>
						</>
					)}
				</div>
			</div>
		</>
	);
}
