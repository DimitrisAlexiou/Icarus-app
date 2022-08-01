export default function UndergraduateCourseNotification({ icon, message }) {
	return (
		<div id="content-wrapper" className="d-flex flex-column">
			<div id="content">
				<div className="container-fluid">
					<div className="text-center">
						<div className="error mx-auto mb-5 mt-5">{icon}</div>
						<p className="text-gray-500 mb-4">{message}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
