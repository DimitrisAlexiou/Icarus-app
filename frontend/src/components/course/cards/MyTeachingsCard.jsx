import { Col, Row } from 'reactstrap';
import useTeachings from '../../../hooks/admin/useTeachings';
import Spinner from '../../boilerplate/spinners/Spinner';
import SpinnerComponent from '../../boilerplate/spinners/SpinnerMessage';
import PillHeader from '../../boilerplate/headers/PillHeader';

export default function MyTeachingsCard() {
	const { teachings, isLoading, getInstructorLabel, handleTeachingRowClick } =
		useTeachings();

	return (
		<>
			<Row className="justify-content-center animated--grow-in mb-3">
				<Col className="text-center">
					<PillHeader title="My Teachings" />
					<h6
						className="text-muted pill-label"
						style={{
							fontWeight: '700',
							fontSize: 15,
						}}
					>
						{teachings.length}
					</h6>
				</Col>
			</Row>
			<div className="profile_card">
				<div className="card-body">
					<div className="align-items-center text-center">
						{isLoading ? (
							<Spinner card />
						) : teachings && teachings.length > 0 ? (
							<>
								{teachings.map((teaching, index) => {
									const instructor = getInstructorLabel(teaching);
									return (
										<Row
											key={index}
											className="clickable"
											onClick={() => handleTeachingRowClick(teaching)}
										>
											<Col>
												<p
													style={{
														textAlign: 'justify',
														fontWeight: '700',
														fontSize: 15,
													}}
													className="text-light-cornflower-blue mb-2"
												>
													{teaching?.course?.title} (
													{teaching?.course?.courseId})
												</p>
												<p
													className="mt-3"
													style={{ textAlign: 'justify', fontSize: 13 }}
												>
													{instructor.map((label, index) => (
														<small
															key={index}
															className="text-muted pill-label"
															style={{
																textAlign: 'justify',
																fontWeight: '700',
																fontSize: 13,
																display: 'inline',
															}}
														>
															{label}
														</small>
													))}
												</p>
												<hr />
											</Col>
										</Row>
									);
								})}
							</>
						) : (
							<SpinnerComponent message="You are not assigned in any teachings." />
						)}
					</div>
				</div>
			</div>
		</>
	);
}
