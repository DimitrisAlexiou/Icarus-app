import * as Yup from 'yup';
import { CourseSchema } from '../course/Course';

export const PrerequisitesSchema = Yup.object().shape({
	prerequisiteType: Yup.string()
		.oneOf(['Hard', 'Soft'])
		.required('Please select the prerequisite type !'),
	// prerequisite: CourseSchema.required('Course prerequisite is required !'),
});
