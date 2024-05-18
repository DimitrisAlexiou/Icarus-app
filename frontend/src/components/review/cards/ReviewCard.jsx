import { forwardRef } from 'react';
import { Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import {
	convertToPercentage,
	getProgressBarColor,
} from '../../../utils/progressBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ReviewType } from '../../../constants/enums';
import TeachingReviewCard from './TeachingReviewCard';
import GeneralReviewCard from './GeneralReviewCard';
import InstructorReviewCard from './InstructorReviewCard';
import { getReviewFormComponent } from '../ReviewForm';

export default function ReviewCard({
	review,
	reviewType,
	reviewHasEnded,
	handleDeleteReview,
	modal,
	setModal,
	modalRef,
	dispatch,
	isEditing,
	editReviewId,
	setEditReview,
}) {
	const renderReviewFields = (review) => {
		switch (reviewType) {
			case ReviewType.Teaching:
				return (
					<TeachingReviewCard
						review={review}
						getProgressBarColor={getProgressBarColor}
						convertToPercentage={convertToPercentage}
					/>
				);
			case ReviewType.General:
				return <GeneralReviewCard review={review} />;
			case ReviewType.Instructor:
				return (
					<InstructorReviewCard
						review={review}
						getProgressBarColor={getProgressBarColor}
						convertToPercentage={convertToPercentage}
					/>
				);
			default:
				return null;
		}
	};

	const toggle = () => {
		setModal(!modal);
		dispatch(
			setEditReview({
				isEditing: false,
				editReviewId: '',
			})
		);
	};

	const ModalComponent = forwardRef((props, ref) => {
		return (
			<Modal ref={ref} isOpen={modal} toggle={toggle} className="modal-lg">
				<ModalHeader toggle={toggle}>
					Edit review (
					<span style={{ fontWeight: 'bold', fontSize: '21px' }}>
						{review?.teaching?.course?.title}
					</span>
					)
				</ModalHeader>
				<ModalBody>{getReviewFormComponent(reviewType)}</ModalBody>
			</Modal>
		);
	});

	return (
		<>
			<Row>
				<Col>
					<h5 className="d-flex align-items-center mb-3 font-weight-bold mb-4">
						{review?.teaching?.course?.title}
					</h5>
				</Col>
				{reviewHasEnded ? null : (
					<>
						<Col xl="1" className="text-right">
							<FontAwesomeIcon
								className="clickable"
								onClick={() => {
									dispatch(
										setEditReview({
											editReviewId: review._id,
										})
									);
									setModal(true);
								}}
								icon={faEdit}
							/>
						</Col>
						<Col xl="1" className="text-right">
							<FontAwesomeIcon
								className="clickable"
								onClick={() => handleDeleteReview(reviewType, review._id)}
								icon={faXmark}
							/>
						</Col>
					</>
				)}
			</Row>
			{renderReviewFields(review)}
			<ModalComponent ref={modalRef} />
		</>
	);
}
