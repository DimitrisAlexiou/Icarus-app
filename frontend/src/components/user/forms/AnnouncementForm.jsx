import { Form, Formik } from 'formik';
import { Col, Row } from 'reactstrap';
import {
	createAnnouncement,
	setEditAnnouncement,
	updateAnnouncement,
} from '../../../features/announcements/announcementSlice';
import { AnnouncementSchema } from '../../../schemas/user/Announcement';
import Spinner from '../../boilerplate/spinners/Spinner';
import SelectField from '../../form/SelectField';
import TextField from '../../form/TextField';
import TextAreaField from '../../form/TextAreaField';
import SwitchField from '../../form/SwitchField';
import NumberField from '../../form/NumberField';
import SingleDatePickerField from '../../form/SingleDatePickerField';
import SubmitButton from '../../buttons/SubmitButton';
import ClearButton from '../../buttons/ClearButton';

export default function AnnouncementForm({
	announcement,
	teachings,
	isEditingAnnouncement,
	editAnnouncementId,
	setModal,
	dispatch,
}) {
	return (
		<>
			<Formik
				initialValues={{
					title: announcement ? announcement.title : '',
					text: announcement ? announcement.text : '',
					publishDate: announcement
						? new Date(announcement.publishDate)
						: new Date(),
					visibility: announcement ? announcement.visibility : 1,
					isVisible: announcement ? announcement.isVisible : false,
					teaching: announcement ? announcement.teaching._id : '',
				}}
				enableReinitialize={true}
				validationSchema={AnnouncementSchema}
				onSubmit={(values, { setSubmitting }) => {
					const announcement = {
						title: values.title,
						text: values.text,
						publishDate: values.publishDate,
						visibility: values.visibility,
						isVisible: values.isVisible,
						teaching: values.teaching,
					};

					if (isEditingAnnouncement) {
						dispatch(
							updateAnnouncement({
								announcementId: editAnnouncementId,
								data: announcement,
							})
						);
						setSubmitting(false);
						dispatch(
							setEditAnnouncement({
								isEditingAnnouncement: false,
								editAnnouncementId: '',
							})
						);
						setModal(false);
						return;
					}
					dispatch(createAnnouncement(announcement));
					setSubmitting(false);
				}}
				validateOnMount
			>
				{({ isSubmitting, values, dirty, setFieldValue, handleReset }) => (
					<Form>
						<Row className="align-items-center">
							<Col xl="7" lg="7" md="12" xs="12">
								<TextField name="title" label="Title" />
							</Col>
							<Col lg="2" xs="6" className="text-center">
								<SwitchField
									name="isVisible"
									label="Visible"
									onChange={() => setFieldValue('isVisible', !values.isVisible)}
								/>
							</Col>
							<Col lg="3" xs="6">
								<SingleDatePickerField
									name="publishDate"
									label="Publish Date"
								/>
							</Col>
						</Row>
						<TextAreaField name="text" label="Text" />
						<Row>
							<Col xl="9" lg="9" md="9">
								<SelectField
									name="teaching"
									label="My Teachings"
									options={
										<>
											{announcement ? (
												<option>{announcement.teaching.course.title}</option>
											) : (
												<>
													<option className="text-gray-300" default>
														Select teaching
													</option>
													{teachings.map((teaching) => (
														<option key={teaching._id} value={teaching._id}>
															{teaching.course.title}
														</option>
													))}
												</>
											)}
										</>
									}
								/>
							</Col>
							<Col>
								<NumberField name="visibility" min="1" label="Visibility" />
							</Col>
						</Row>
						<Row>
							<ClearButton
								onClick={() => handleReset()}
								disabled={!dirty || isSubmitting}
							/>
							<SubmitButton
								body={
									isSubmitting ? (
										<>
											Please wait <Spinner type="grow" size="sm" />
										</>
									) : isEditingAnnouncement ? (
										'Update'
									) : (
										'Create'
									)
								}
								disabled={isSubmitting}
							/>
						</Row>
					</Form>
				)}
			</Formik>
		</>
	);
}
