import axiosFetch from '../../utils/axios';
import {
	API_URL_ADMIN_ANNOUNCEMENTS,
	API_URL_ANNOUNCEMENT,
} from '../../constants/apiConfig';

const getAnnouncement = async (announcementId) => {
	const response = await axiosFetch.get(
		API_URL_ANNOUNCEMENT + '/' + announcementId
	);

	return response.data;
};

const createAnnouncement = async (data) => {
	const response = await axiosFetch.post(API_URL_ANNOUNCEMENT, data);

	return response.data;
};

const updateAnnouncement = async (announcementId, data) => {
	const response = await axiosFetch.put(
		API_URL_ANNOUNCEMENT + '/' + announcementId,
		data
	);

	return response.data;
};

const deleteAnnouncement = async (announcementId) => {
	const response = await axiosFetch.delete(
		API_URL_ANNOUNCEMENT + '/' + announcementId
	);

	return response.data;
};

const getInstructorAnnouncements = async () => {
	const response = await axiosFetch.get(API_URL_ANNOUNCEMENT + '/instructor');

	return response.data;
};

const deleteInstructorAnnouncements = async () => {
	const response = await axiosFetch.delete(
		API_URL_ANNOUNCEMENT + '/instructor'
	);

	return response.data;
};

const getTeachingAnnouncements = async (teachingId) => {
	const response = await axiosFetch.get(
		API_URL_ANNOUNCEMENT + '/teaching/' + teachingId
	);

	return response.data;
};

const deleteTeachingAnnouncements = async (teachingId) => {
	const response = await axiosFetch.delete(
		API_URL_ANNOUNCEMENT + '/teaching/' + teachingId
	);

	return response.data;
};

const getAnnouncements = async () => {
	const response = await axiosFetch.get(API_URL_ADMIN_ANNOUNCEMENTS);

	return response.data;
};

const deleteAnnouncements = async () => {
	const response = await axiosFetch.delete(API_URL_ADMIN_ANNOUNCEMENTS);

	return response.data;
};

const announcementService = {
	createAnnouncement,
	updateAnnouncement,
	deleteAnnouncement,
	deleteTeachingAnnouncements,
	getAnnouncement,
	getInstructorAnnouncements,
	deleteInstructorAnnouncements,
	getTeachingAnnouncements,
	getAnnouncements,
	deleteAnnouncements,
};

export default announcementService;
