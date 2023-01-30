import { Col, Row } from 'reactstrap';

export default function ProfileCard3({ user }) {
	return (
		<>
			<Row>
				<Col>
					<div className="profile_card">
						<div className="card-body">
							<h5 className="d-flex align-items-center mb-3">User Status</h5>
							<p>Web Design</p>
							<div className="progress mb-3" style={{ height: '5px' }}>
								<div
									className="progress-bar bg-primary"
									role="progressbar"
									style={{ width: '80%' }}
									aria-valuenow="80"
									aria-valuemin="0"
									aria-valuemax="100"
								></div>
							</div>
							<p>Website Markup</p>
							<div className="progress mb-3" style={{ height: '5px' }}>
								<div
									className="progress-bar bg-danger"
									role="progressbar"
									style={{ width: '72%' }}
									aria-valuenow="72"
									aria-valuemin="0"
									aria-valuemax="100"
								></div>
							</div>
							<p>One Page</p>
							<div className="progress mb-3" style={{ height: '5px' }}>
								<div
									className="progress-bar bg-success"
									role="progressbar"
									style={{ width: '89%' }}
									aria-valuenow="89"
									aria-valuemin="0"
									aria-valuemax="100"
								></div>
							</div>
							<p>Mobile Template</p>
							<div className="progress mb-3" style={{ height: '5px' }}>
								<div
									className="progress-bar bg-warning"
									role="progressbar"
									style={{ width: '55%' }}
									aria-valuenow="55"
									aria-valuemin="0"
									aria-valuemax="100"
								></div>
							</div>
							<p>Backend API</p>
							<div className="progress" style={{ height: '5px' }}>
								<div
									className="progress-bar bg-info"
									role="progressbar"
									style={{ width: '66%' }}
									aria-valuenow="66"
									aria-valuemin="0"
									aria-valuemax="100"
								></div>
							</div>
						</div>
					</div>
				</Col>
			</Row>
		</>
	);
}
