import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row } from 'reactstrap';

export default function DashboardCard({
	borderClass,
	textClass,
	label,
	object,
	icon,
}) {
	return (
		<>
			<Col xl="3" md="6" className="mb-4">
				<div className={`card ${borderClass} shadow h-100 py-2`}>
					<div className="card-body">
						<Row className="no-gutters align-items-center">
							<Col className="mr-2">
								<div
									className={`text-xs font-weight-bold ${textClass} text-uppercase mb-1`}
								>
									{label}
								</div>
								<div className="h5 mb-0 font-weight-bold text-gray-800">
									{object}
								</div>
							</Col>
							<div className="col-auto">
								<i className="fa-2x text-gray-300">
									<FontAwesomeIcon icon={icon} />
								</i>
							</div>
						</Row>
					</div>
				</div>
			</Col>
		</>
	);
}
