import moment from 'moment';
import { forwardRef, useRef, useState } from 'react';
import {
	Row,
	Col,
	CardTitle,
	CardText,
	Modal,
	ModalHeader,
	ModalBody,
	Button,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import useAnnouncements from '../../hooks/user/useAnnouncements';
import CarouselComponent from '../../components/Carousel';
import AnnouncementForm from '../../components/user/forms/AnnouncementForm';
import HeaderWithSemester from '../../components/boilerplate/headers/HeaderWithSemester';
import FormHeader from '../../components/boilerplate/headers/FormHeader';
import Spinner from '../../components/boilerplate/spinners/Spinner';
import SpinnerComponent from '../../components/boilerplate/spinners/SpinnerMessage';
import PillHeader from '../../components/boilerplate/headers/PillHeader';

export default function Announcements() {
	const {
		teachings,
		announcements,
		isAnnouncementsLoading,
		setEditAnnouncement,
		isEditingAnnouncement,
		editAnnouncementId,
		handleDeleteAnnouncement,
		handleDeleteInstructorAnnouncements,
		dispatch,
	} = useAnnouncements();

	const myRef = useRef(null);
	const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
	const [modal, setModal] = useState(false);

	const toggle = () => {
		setModal(!modal);
		dispatch(
			setEditAnnouncement({
				isEditingAnnouncement: false,
				editAnnouncementId: '',
			})
		);
	};

	const ModalComponent = forwardRef(({ announcement, ...props }, ref) => {
		return (
			<Modal ref={ref} isOpen={modal} toggle={toggle} className="modal-lg">
				<ModalHeader toggle={toggle}>
					Edit Announcement (
					<span style={{ fontWeight: 'bold', fontSize: '21px' }}>
						{announcement?.title}
					</span>
					)
					<Button
						className="btn btn-light mx-3"
						style={{
							fontWeight: 500,
							fontSize: 15,
						}}
						onClick={() => {
							handleDeleteAnnouncement(announcement);
							toggle();
						}}
					>
						<FontAwesomeIcon icon={faTrashAlt} />
					</Button>
				</ModalHeader>
				<ModalBody>
					<AnnouncementForm
						announcement={announcement}
						isEditingAnnouncement={isEditingAnnouncement}
						editAnnouncementId={editAnnouncementId}
						setModal={setModal}
						dispatch={dispatch}
					/>
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
							<FontAwesomeIcon
								className="clickable"
								icon={faCircleXmark}
								onClick={() => {
									handleDeleteInstructorAnnouncements();
								}}
							/>
						</span>
					) : null}
				</Col>
			</Row>

			{isAnnouncementsLoading ? (
				<Spinner card />
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
						dispatch(
							setEditAnnouncement({ editAnnouncementId: announcement._id })
						);
						setSelectedAnnouncement(announcement);
						setModal(true);
					}}
				/>
			) : (
				<div className="mb-5">
					<SpinnerComponent message="You have not made any announcements yet." />
				</div>
			)}

			{!teachings.length && !isAnnouncementsLoading ? (
				<Row className="mb-3 animated--grow-in">
					<Col className="d-flex justify-content-center">
						<span className="text-sm text-gray-500">
							<small
								className="text-warning pill-label mb-3"
								style={{
									textAlign: 'justify',
									fontWeight: '700',
									fontSize: 16,
								}}
							>
								Warning
							</small>
							You must be assigned to at least one teaching in order to create
							an announcement.
						</span>
					</Col>
				</Row>
			) : null}

			<Row className="justify-content-center animated--grow-in">
				<Col
					style={{
						pointerEvents: teachings.length ? 'auto' : 'none',
						opacity: teachings.length ? 1 : 0.6,
					}}
					xl="8"
					lg="11"
					md="12"
				>
					<div className="card shadow mb-5">
						<FormHeader title="Fill the form below to create a new teaching announcement" />
						<div className="card-body">
							<AnnouncementForm teachings={teachings} dispatch={dispatch} />
						</div>
					</div>
				</Col>
			</Row>

			<ModalComponent
				ref={myRef}
				isEditingAnnouncement={isEditingAnnouncement}
				toggle={toggle}
				announcement={selectedAnnouncement}
			/>
		</>
	);
}
