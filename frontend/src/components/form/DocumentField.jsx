import { FormGroup, Input, Label } from 'reactstrap';
import { ErrorMessage, useField } from 'formik';
import { fileSizeAlert } from '../../constants/sweetAlertNotification';
import { MAX_FILE_SIZE_BYTES } from '../../constants/strings';
import FormErrorMessage from './FormErrorMessage';

// const DocumentField = ({ label, ...props }) => {
// 	const [field, helpers] = useField(props);

// 	const handleFileChange = (event) => {
// 		const files = event.currentTarget.files;
// 		helpers.setValue(files);
// 	};

// 	const validateFileSize = (files) => {
// 		for (let i = 0; i < files.length; i++) {
// 			if (files[i].size > MAX_FILE_SIZE_BYTES) {
// 				props.event.currentTarget.value = '';
// 				fileSizeAlert(files[i].name);
// 			}
// 		}
// 		return null;
// 	};

// 	return (
// 		<FormGroup>
// 			<Label for={props.name}>{label}</Label>
// 			<Input
// 				type="file"
// 				onChange={(event) => {
// 					const files = event.currentTarget.files;
// 					const validationError = validateFileSize(files);

// 					if (!validationError) {
// 						handleFileChange(event);
// 						props.onChange && props.onChange(event);
// 					}
// 				}}
// 				onBlur={field.onBlur}
// 				{...props}
// 				max="10"
// 				accept=".pdf,.zip,.gzip,.txt,.jpg,.png,.jpeg"
// 				multiple
// 			/>
// 			<ErrorMessage name={props.name} component={FormErrorMessage} />
// 		</FormGroup>
// 	);
// };

const DocumentField = ({ setFieldValue, label, ...props }) => {
	return (
		<FormGroup>
			<Label for={props.name}>{label}</Label>
			<Input
				type="file"
				name="files"
				onChange={(event) => {
					setFieldValue('files', event.currentTarget.files);
					// const files = event.target.files;
					// setFieldValue('files', files);
				}}
				max="10"
				accept=".pdf,.zip,.gzip,.txt,.jpg,.png,.jpeg"
				multiple
			/>
			<ErrorMessage name={props.name} component={FormErrorMessage} />
		</FormGroup>
	);
};

export default DocumentField;
