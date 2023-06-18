import axiosFetch from '../../utils/axios';
import { API_URL_TEACHING } from '../../constants/config';

const updateTeaching = async (teachingId, data) => {
	const response = await axiosFetch.put(API_URL_TEACHING + '/' + teachingId, data);

	return response.data;
};

const getTeaching = async (teachingId) => {
	const response = await axiosFetch.get(API_URL_TEACHING + '/' + teachingId);

	return response.data;
};

const deleteTeaching = async (teachingId) => {
	const response = await axiosFetch.delete(API_URL_TEACHING + '/' + teachingId);

	return response.data;
};

const getTeachings = async () => {
	const response = await axiosFetch.get(API_URL_TEACHING);

	return response.data;
};

const deleteTeachings = async () => {
	const response = await axiosFetch.delete(API_URL_TEACHING + '/delete');

	return response.data;
};

const teachingService = {
	updateTeaching,
	getTeaching,
	deleteTeaching,
	getTeachings,
	deleteTeachings,
};

export default teachingService;
