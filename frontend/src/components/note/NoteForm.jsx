import { FormGroup, Label } from 'reactstrap';
import { Field, ErrorMessage } from 'formik';
import FormErrorMessage from '../FormErrorMessage';

const NoteForm = ({ initialValues }) => {
	// export default function NoteForm() {
	return (
		<>
			<FormGroup className="form-floating mb-3" floating>
				<Field type="text" className="form-control" name="title" />
				<Label for="title" className="text-gray-600">
					Title
				</Label>
				<ErrorMessage name="title" component={FormErrorMessage} />
			</FormGroup>

			<FormGroup className="form-floating mb-3" floating>
				<Field
					as="textarea"
					className="form-control"
					style={{ height: '180px', text_align: 'justify' }}
					name="text"
				/>
				<Label for="text" className="text-gray-600">
					Text
				</Label>
				<ErrorMessage name="text" component={FormErrorMessage} />
			</FormGroup>

			{/* <div className="row">
                <SubmitButton message={'Post Note'} />
            </div> */}
		</>
	);
};

export default NoteForm;
