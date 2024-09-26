export default function ProfileProgressCard({
	calculatePercentagePassedTeachings,
	calculatePercentageTotalECTS,
}) {
	return (
		<>
			<div className="card-body animated--grow-in mb-5">
				<h5 className="d-flex align-items-center mb-3 font-weight-bold mb-4">
					Degree Status
				</h5>
				<p> Passed Courses</p>
				<div className="progress mb-3" style={{ height: '5px' }}>
					<div
						className="progress-bar bg-primary"
						role="progressbar"
						style={{ width: `${calculatePercentagePassedTeachings()}%` }}
						aria-valuenow={calculatePercentagePassedTeachings()}
						aria-valuemin="0"
						aria-valuemax="100"
					></div>
				</div>
				<p>Closed Cycles</p>
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
				<p>Total ECTS</p>
				<div className="progress mb-3" style={{ height: '5px' }}>
					<div
						className="progress-bar bg-success"
						role="progressbar"
						style={{ width: `${calculatePercentageTotalECTS()}%` }}
						aria-valuenow={calculatePercentageTotalECTS()}
						aria-valuemin="0"
						aria-valuemax="100"
					></div>
				</div>
				{/* <p>Total registered courses</p>
				<div className="progress" style={{ height: '5px' }}>
					<div
						className="progress-bar bg-warning"
						role="progressbar"
						style={{ width: `${registeredTeachings}%` }}
						aria-valuenow={registeredTeachings}
						aria-valuemin="0"
						aria-valuemax="100"
					></div>
				</div> */}
			</div>
		</>
	);
}
