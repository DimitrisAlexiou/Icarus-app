import { Row, Col, Badge, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	deleteReview,
	setEditReview,
} from '../../../features/admin/reviewSlice';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons';
import { deleteAlert } from '../../../constants/sweetAlertNotification';
import ReviewForm from '../forms/ReviewForm';
import Spinner from '../../boilerplate/spinners/Spinner';

const ReviewCard = ({
	review,
	semester,
	isReviewLoading,
	isEditingReview,
	editReviewId,
	reviewStart,
	reviewEnd,
	dispatch,
}) => {
	return (
		<>
			<Col xl="6" lg="12" md="12" sm="12">
				<Badge color="info">Review</Badge>
				<Row className="mt-3 mb-4">
					<Col xl="11" lg="11" md="12" sm="12">
						<div className="card shadow mb-3 py-1">
							<div className="card-body">
								{!semester ? (
									<Col
										className="text-warning mt-2"
										style={{
											textAlign: 'justify',
											fontWeight: '600',
											fontSize: 12,
										}}
									>
										Semester must be defined first, in order to make the Review
										statement configuration for this period!
									</Col>
								) : isReviewLoading ? (
									<Spinner card />
								) : !review || isEditingReview ? (
									<>
										<Row>
											<ReviewForm
												review={review}
												isEditingReview={isEditingReview}
												editReviewId={editReviewId}
												semester={semester}
												dispatch={dispatch}
											/>
											<Col
												className="text-warning mt-2"
												style={{
													textAlign: 'justify',
													fontWeight: '600',
													fontSize: 12,
												}}
											>
												{isEditingReview
													? 'Editing the review statement . . .'
													: 'Review statement period has not been defined!'}
											</Col>
											{isEditingReview ? (
												<Col xs="2" sm="6" md="6" className="text-right mt-1">
													<FontAwesomeIcon
														className="clickable"
														onClick={() =>
															dispatch(
																setEditReview({
																	isEditingReview: false,
																	editReviewId: '',
																})
															)
														}
														icon={faXmark}
													/>
												</Col>
											) : null}
										</Row>
									</>
								) : (
									<>
										<Row className="mb-3">
											<Col>
												<label>
													<b>Review Start</b>
												</label>
												{review.startAfter ? (
													<p style={{ textAlign: 'justify' }}>
														{review.startAfter}
														<span
															style={{
																fontWeight: '400',
																fontSize: 12,
															}}
														>
															{' '}
															weeks after the semester start
														</span>
													</p>
												) : (
													<p style={{ textAlign: 'justify' }}>0</p>
												)}
												<hr />
											</Col>
											<Col>
												<label>
													<b>Review Period</b>
												</label>
												{review.period ? (
													<p style={{ textAlign: 'justify' }}>
														{review.period}
														<span
															style={{
																fontWeight: '400',
																fontSize: 12,
															}}
														>
															{' '}
															weeks after the review start
														</span>
													</p>
												) : (
													<p style={{ textAlign: 'justify' }}>0</p>
												)}
												<hr />
											</Col>
										</Row>
										<Row className="mb-3">
											<Col md="6">
												<label>
													<b>Start Date</b>
												</label>
												<p style={{ textAlign: 'justify' }}>
													{reviewStart.format('DD/MM/YYYY')}
												</p>
												<hr />
											</Col>
											<Col>
												<label>
													<b>End Date</b>
												</label>
												<p style={{ textAlign: 'justify' }}>
													{reviewEnd.format('DD/MM/YYYY')}
												</p>
												<hr />
											</Col>
										</Row>
										<Row>
											<Col
												className="text-info mt-2"
												style={{
													textAlign: 'justify',
													fontWeight: '600',
													fontSize: 12,
												}}
											>
												Review Statement period has been defined!
											</Col>
											<Col className="text-right px-0">
												<Row>
													<Col>
														<Button
															className="btn btn-light"
															style={{
																fontWeight: 500,
																fontSize: 15,
															}}
															onClick={() =>
																dispatch(
																	setEditReview({
																		editReviewId: review._id,
																	})
																)
															}
														>
															<FontAwesomeIcon icon={faEdit} />
														</Button>
													</Col>
													<Col>
														<Col>
															<Button
																className="btn btn-light"
																style={{
																	fontWeight: 500,
																	fontSize: 15,
																}}
																onClick={async () =>
																	deleteAlert(() =>
																		dispatch(deleteReview(review._id))
																	)
																}
															>
																<FontAwesomeIcon icon={faTrashAlt} />
															</Button>
														</Col>
													</Col>
												</Row>
											</Col>
										</Row>
									</>
								)}
							</div>
						</div>
					</Col>
				</Row>
			</Col>
		</>
	);
};

export default ReviewCard;
