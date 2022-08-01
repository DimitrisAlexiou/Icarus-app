import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge } from '@fortawesome/free-solid-svg-icons';

export default function ProfileCard1({ user }) {
	return (
		<>
			<div className="col-lg-4">
				<div className="profile_card">
					<div className="card-body">
						<div className="d-flex flex-column align-items-center text-center">
							<img
								src="undraw_profile.svg"
								alt="Admin"
								className="rounded-circle p-1 bg-primary"
								width="130"
							/>
							<div className="mt-3">
								<h4>{user.email}</h4>
								<p className="text-secondary mb-1">role</p>
								<p className="text-muted font-size-sm">University of Aegean</p>
							</div>
						</div>
						<hr className="my-4" />
						<ul className="list-group list-group-flush">
							<li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
								<h6 className="mb-0">
									<i className="mr-2 text-gray-400">
										<FontAwesomeIcon icon={faIdBadge} />
									</i>
									Reg. number :
								</h6>
								<span className="text-secondary"> 321/{user.uid}</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
}
