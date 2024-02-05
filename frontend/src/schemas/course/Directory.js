import * as Yup from 'yup';
import { directoryNameRegex } from '../../constants/regex';

export const DirectorySchema = Yup.object().shape({
	name: Yup.string()
		.max(60, 'Directory name must be 60 characters or less.')
		.matches(directoryNameRegex, 'Directory name must be alphabetic.')
		.required('Directory name is required.'),
	items: Yup.array().of(
		Yup.string().required('Please provide one or more document/s.')
	),
});
