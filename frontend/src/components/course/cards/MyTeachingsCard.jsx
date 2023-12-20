import { Col, Row } from 'reactstrap';
import useTeachings from '../../../hooks/admin/useTeachings';
import Spinner from '../../boilerplate/spinners/Spinner';
import SpinnerComponent from '../../boilerplate/spinners/SpinnerMessage';

export default function MyTeachingsCard() {
	const {
		teachings,
		isLoading,
		instructorTeachings,
		getInstructorLabel,
		handleTeachingRowClick,
	} = useTeachings();

	return (
		<>
			<Row className="justify-content-center animated--grow-in mb-3">
				<h6
					className="animated--grow-in text-gray-500"
					style={{ textAlign: 'center' }}
				>
					<small
						className="text-muted pill-label"
						style={{
							fontWeight: '700',
							fontSize: 15,
						}}
					>
						My Teachings
					</small>
				</h6>
			</Row>
			<div className="profile_card">
				<div className="card-body">
					<div className="align-items-center text-center">
						{isLoading ? (
							<Spinner card />
						) : teachings && teachings.length > 0 ? (
							instructorTeachings.length > 0 ? (
								<>
									{instructorTeachings.map((teaching, index) => {
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
									<Col className="d-flex justify-content-end">
										<h6 className="text-gray-400 font-weight-bold animated--grow-in">
											{instructorTeachings.length} teaching
											{instructorTeachings.length > 1 && 's'} assigned
										</h6>
									</Col>
									{/* {numOfPages > 1 ? <PageButton /> : null} */}
								</>
							) : (
								<SpinnerComponent message="You are not assigned in any teachings." />
							)
						) : (
							<SpinnerComponent message="There are no teachings available." />
						)}
					</div>
				</div>
			</div>
		</>
	);
}
