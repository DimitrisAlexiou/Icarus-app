import moment from 'moment';
import { forwardRef } from 'react';
import {
	Row,
	Col,
	CardTitle,
	CardText,
	Modal,
	ModalHeader,
	ModalBody,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import useModal from '../../hooks/generic/useModal';
import AnnouncementCard from '../user/cards/AnnouncementCard';
import CarouselComponent from '../Carousel';
import PillHeader from '../boilerplate/headers/PillHeader';
import Spinner from '../boilerplate/spinners/Spinner';
import SpinnerComponent from '../boilerplate/spinners/SpinnerMessage';

export default function TeachingAnnouncements({
	user,
	announcements,
	isAnnouncementsLoading,
	handleDeleteTeachingAnnouncements,
}) {
	const { modal, selectedItem, openModal, closeModal } = useModal();

	const ModalComponent = forwardRef((props, ref) => {
		return (
			<Modal ref={ref} isOpen={modal} toggle={closeModal} className="modal-lg">
				<ModalHeader toggle={closeModal}>
					<span style={{ fontWeight: 'bold', fontSize: '21px' }}>
						{selectedItem?.title}
					</span>
					<small
						className="mx-3 text-muted pill-label"
						style={{
							textAlign: 'justify',
							fontWeight: '700',
							fontSize: 12,
						}}
					>
						{selectedItem?.teaching.course.title}
					</small>
				</ModalHeader>
				<ModalBody>
					<AnnouncementCard user={user} announcement={selectedItem} />
				</ModalBody>
			</Modal>
		);
	});

	return (
		<>
			{user.user.isAdmin ? (
				<Row className="mb-4 justify-content-between animated--grow-in">
					<Col className="text-center">
						<PillHeader title="announcements" />
						{!isAnnouncementsLoading ? (
							<h6
								className="text-muted pill-label"
								style={{
									fontWeight: '700',
									fontSize: 15,
								}}
							>
								{announcements.length}
							</h6>
						) : null}
						{announcements.length ? (
							<span
								className="text-danger"
								style={{
									fontWeight: '500',
									fontSize: 15,
								}}
							>
								<FontAwesomeIcon
									className="clickable"
									icon={faCircleXmark}
									onClick={() => handleDeleteTeachingAnnouncements()}
								/>
							</span>
						) : null}
					</Col>
				</Row>
			) : null}

			<Row className="justify-content-center animated--grow-in">
				<Col xs="12" sm="12" md="12" lg="10" xl="10">
					{isAnnouncementsLoading ? (
						<Spinner card />
					) : announcements?.length > 0 ? (
						<CarouselComponent
							objects={announcements}
							renderItem={(announcement) => (
								<>
									<Row>
										<Col>
											<CardTitle
												style={{
													textAlign: 'justify',
													fontWeight: '700',
													fontSize: 15,
												}}
												className="text-light-cornflower-blue mb-2"
											>
												{announcement.title}
											</CardTitle>
										</Col>
										{user.user.isAdmin || user.user.instructor ? (
											<Col xs="auto" className="d-flex justify-content-end">
												<CardText
													className={
														announcement.isVisible
															? 'text-success'
															: 'text-warning'
													}
													style={{
														textAlign: 'justify',
														fontWeight: '700',
														fontSize: 13,
													}}
												>
													{announcement.isVisible ? 'Visible' : 'Not Visible'}
												</CardText>
											</Col>
										) : null}
									</Row>
									<CardText
										className="text-muted"
										style={{
											textAlign: 'justify',
											fontWeight: '700',
											fontSize: 13,
										}}
									>
										{announcement.owner.name} {announcement.owner.surname}
									</CardText>
									<Row>
										<Col>
											<CardText
												style={{
													textAlign: 'justify',
													fontWeight: '600',
													fontSize: 11,
												}}
											>
												{user.user.isAdmin || user.user.instructor
													? 'Publish at'
													: 'Published at'}{' '}
												{moment(announcement.publishDate).format(
													'MMMM D, YYYY'
												)}
											</CardText>
										</Col>
										{user.user.isAdmin || user.user.instructor ? (
											<Col xs="auto" className="d-flex justify-content-end">
												<CardText
													className="text-muted"
													style={{
														textAlign: 'justify',
														fontWeight: '600',
														fontSize: 11,
													}}
												>
													active until{' '}
													{moment(announcement.publishDate)
														.add(announcement.visibility, 'days')
														.format('MMMM D, YYYY')}
												</CardText>
											</Col>
										) : null}
									</Row>
								</>
							)}
							onObjectClick={(announcement) => {
								openModal(announcement);
							}}
						/>
					) : (
						<Row className="justify-content-center animated--grow-in mb-3">
							<Col>
								<div className="profile_card">
									<div className="card-body">
										<SpinnerComponent message="There are no announcements posted." />
									</div>
								</div>
							</Col>
						</Row>
					)}
				</Col>
			</Row>

			<ModalComponent toggle={closeModal} />
		</>
	);
}
