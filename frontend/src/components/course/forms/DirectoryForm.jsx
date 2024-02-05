import { useState } from 'react';
import { Form, Formik } from 'formik';
import { Button, Col, Row, Spinner } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCirclePlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { DirectorySchema } from '../../../schemas/course/Directory';
import {
	createDirectory,
	setEditDirectory,
	updateDirectory,
} from '../../../features/courses/directorySlice';
import TextField from '../../form/TextField';
import DocumentField from '../../form/DocumentField';
import SubmitButton from '../../buttons/SubmitButton';
import ClearButton from '../../buttons/ClearButton';

export default function DirectoryForm({
	teaching,
	isEditingDirectory,
	editDirectoryId,
	dispatch,
}) {
	const [document, showDocument] = useState(false);

	const addDocument = () => {
		showDocument(!document);
	};

	return (
		<>
			<Formik
				initialValues={{
					name: '',
					items: [],
				}}
				enableReinitialize={true}
				// validationSchema={DirectorySchema}
				onSubmit={(values, { setSubmitting }) => {
					const directory = {
						name: values.name,
						items: values.items.map((file) => ({
							name: file.name,
							size: file.size,
							type: file.type,
							lastModifiedDate: file.lastModifiedDate,
						})),
					};
					if (isEditingDirectory) {
						dispatch(
							updateDirectory({
								teachingId: teaching._id,
								directoryId: editDirectoryId,
								data: directory,
							})
						);
						setSubmitting(false);
						dispatch(
							setEditDirectory({
								isEditingDirectory: false,
								editDirectoryId: '',
							})
						);
						return;
					}
					console.log(directory);
					dispatch(
						createDirectory({ teachingId: teaching._id, data: directory })
					);
					setSubmitting(false);
				}}
				validateOnMount
			>
				{({ isSubmitting, dirty, setFieldValue, handleReset }) => (
					<Form>
						<Row className="align-items-center">
							<Col md="10" xs="12">
								<TextField name="name" label="Name" />
							</Col>
							<Col md="2" className="text-right mb-3">
								<Button
									className="btn btn-light"
									color="null"
									onClick={addDocument}
								>
									{document ? (
										<FontAwesomeIcon icon={faXmark} />
									) : (
										<FontAwesomeIcon icon={faFileCirclePlus} />
									)}
								</Button>
							</Col>
						</Row>
						{document ? (
							<DocumentField
								name="items"
								label="Document(s)"
								onChange={(event) => {
									const files = event.nativeEvent.target.files;
									setFieldValue(
										'items',
										Array.from(files).map((file) => ({
											name: file.name,
											size: file.size,
											type: file.type,
											lastModifiedDate: file.lastModifiedDate,
										}))
									);
								}}
							/>
						) : // onChange={(event) => {
						// 	const files = event.nativeEvent.target.files;
						// 	setFieldValue('items', Array.from(files));
						// }}
						null}
						<Row>
							<ClearButton
								onClick={() => {
									handleReset();
									showDocument(false);
								}}
								disabled={!dirty || isSubmitting}
							/>
							<SubmitButton
								body={
									isSubmitting ? (
										<>
											Please wait <Spinner type="grow" size="sm" />
										</>
									) : isEditingDirectory ? (
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
