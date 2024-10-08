import { useSelector } from 'react-redux';
import { forwardRef } from 'react';
import {
	Row,
	Col,
	CardTitle,
	CardText,
	Modal,
	ModalHeader,
	ModalBody,
	Button,
	Spinner,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import moment from 'moment';
import useAnnouncements from '../../hooks/user/useAnnouncements';
import useAdminAnnouncements from '../../hooks/admin/useAdminAnnouncements';
import useModal from '../../hooks/generic/useModal';
import CarouselComponent from '../../components/Carousel';
import HeaderWithSemester from '../../components/boilerplate/headers/HeaderWithSemester';
import Loading from '../../components/boilerplate/spinners/Spinner';
import SpinnerComponent from '../../components/boilerplate/spinners/SpinnerMessage';
import PillHeader from '../../components/boilerplate/headers/PillHeader';
import AnnouncementCard from '../../components/announcement/cards/AnnouncementCard';

export default function AdminAnnouncements() {
	const { user } = useSelector((state) => state.auth);

	const { handleDeleteAnnouncement } = useAnnouncements();
	const { announcements, isAnnouncementsLoading, handleDeleteAnnouncements } =
		useAdminAnnouncements();
	const { modal, selectedItem, openModal, closeModal } = useModal();

	const ModalComponent = forwardRef((props, ref) => {
		return (
			<Modal ref={ref} isOpen={modal} toggle={closeModal} className="modal-lg">
				<ModalHeader toggle={closeModal}>
					Announcement (
					<span style={{ fontWeight: 'bold', fontSize: '21px' }}>
						{selectedItem?.title}
					</span>
					)
					<Button
						className="btn btn-light mx-3"
						style={{
							fontWeight: 500,
							fontSize: 15,
						}}
						onClick={() => {
							handleDeleteAnnouncement(selectedItem);
							closeModal();
						}}
					>
						{isAnnouncementsLoading ? (
							<Spinner size="sm" color="dark" type="grow" />
						) : (
							<FontAwesomeIcon icon={faTrashAlt} />
						)}
					</Button>
				</ModalHeader>
				<ModalBody>
					<AnnouncementCard user={user} announcement={selectedItem} />
				</ModalBody>
			</Modal>
		);
	});

	return (
		<>
			<HeaderWithSemester title="Teaching Announcement" />

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
							{isAnnouncementsLoading ? (
								<Spinner size="sm" color="dark" type="grow" />
							) : (
								<FontAwesomeIcon
									className="clickable"
									icon={faCircleXmark}
									onClick={() => {
										handleDeleteAnnouncements();
									}}
								/>
							)}
						</span>
					) : null}
				</Col>
			</Row>

			{isAnnouncementsLoading ? (
				<Loading card />
			) : announcements.length > 0 ? (
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
								<Col xs="auto" className="d-flex justify-content-end">
									<CardText
										className={
											announcement.isVisible ? 'text-success' : 'text-warning'
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
							</Row>
							<CardText
								className="text-muted"
								style={{
									textAlign: 'justify',
									fontWeight: '700',
									fontSize: 13,
								}}
							>
								{announcement.teaching?.course?.title}
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
										Publish at{' '}
										{moment(announcement.publishDate).format('MMMM D, YYYY')}
									</CardText>
								</Col>
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
							</Row>
						</>
					)}
					onObjectClick={(announcement) => {
						openModal(announcement);
					}}
				/>
			) : (
				<div className="mb-5">
					<SpinnerComponent message="You have not made any announcements yet." />
				</div>
			)}

			{/* <Row className="justify-content-center animated--grow-in">
				<Col xl="8" lg="11" md="12">
					<div className="card shadow mb-5">
						<FormHeader title="Fill the form below to create a new announcement announcement" />
						<div className="card-body">
							<AnnouncementForm
								teachings={instructorTeachings}
								dispatch={dispatch}
							/>
						</div>
					</div>
				</Col>
			</Row> */}

			<ModalComponent toggle={closeModal} />
		</>
	);
}
