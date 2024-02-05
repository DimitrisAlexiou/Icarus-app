import React, { useState } from 'react';
import { FormGroup, Row, Col, Button, Spinner } from 'reactstrap';
import { Formik, Form, ErrorMessage } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkCircle } from '@fortawesome/free-regular-svg-icons';
import {
	faDroplet,
	faLayerGroup,
	faMinus,
	faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { NoteSchema } from '../../schemas/Note';
import {
	createUserNote,
	deleteCategory,
	setEditNote,
	updateUserNote,
} from '../../features/notes/noteSlice';
import { deleteAlert } from '../../constants/sweetAlertNotification';
import { ChromePicker } from 'react-color';
import CreatableSelect from 'react-select/creatable';
import FormErrorMessage from '../form/FormErrorMessage';
import TextField from '../form/TextField';
import TextAreaField from '../form/TextAreaField';
import FileField from '../form/FileField';
import SwitchField from '../form/SwitchField';
import ClearButton from '../buttons/ClearButton';
import SubmitButton from '../buttons/SubmitButton';

export default function NoteForm({
	note,
	user,
	isEditingNote,
	editNoteId,
	setSelectedCategory,
	setModal,
	dispatch,
}) {
	const [inputValue, setInputValue] = useState('');
	const [value, setValue] = useState([]);
	const [category, showCategory] = useState(false);
	const [categoryColors, setCategoryColors] = useState({});
	const [selectedColor, setSelectedColor] = useState(null);

	const components = {
		DropdownIndicator: null,
	};

	const createOption = (label, color) => ({
		label,
		value: label,
		color,
	});

	const addCategory = () => {
		setInputValue('');
		setValue([]);
		showCategory(!category);
	};

	const handleKeyDown = (event, setFieldValue, values) => {
		if (!inputValue) return;
		switch (event.key) {
			case 'Enter':
			case 'Tab':
				const newCategory = inputValue;
				const newCategoryColor = categoryColors[inputValue] || null;
				console.log('Adding category: ', newCategory);
				console.log('Category color: ', newCategoryColor);
				const newOption = createOption(newCategory, newCategoryColor);
				console.log('New option: ', newOption);

				const categoryExistsInFormik = values.categories.some(
					(option) => option.label === newOption.label
				);

				const categoryExistsInValue = value.some(
					(option) => option.label === newOption.label
				);

				if (!categoryExistsInFormik && !categoryExistsInValue) {
					setFieldValue('categories', [...values.categories, newOption]);
					setValue((prev) => [...prev, newOption]);
				}

				setInputValue('');
				setSelectedColor(null);
				event.preventDefault();
				break;
			default:
				break;
		}
	};

	return (
		<>
			<Formik
				initialValues={{
					title: note ? note.title : '',
					text: note ? note.text : '',
					file: note ? note.file : '',
					categories: note
						? note.categories.map((category) => ({
								label: category,
								value: category,
						  }))
						: [],
					importance: note ? note.importance : false,
				}}
				validationSchema={NoteSchema}
				onSubmit={(values, { setSubmitting }) => {
					const note = {
						title: values.title,
						text: values.text,
						file: values.file,
						categories: values.categories.map((category) => category.value),
						importance: values.importance,
						owner: user.user._id,
					};
					if (isEditingNote) {
						console.log(note);
						dispatch(updateUserNote({ noteId: editNoteId, data: note }));
						setSubmitting(false);
						dispatch(
							setEditNote({
								isEditingNote: false,
								editNoteId: '',
							})
						);
						setModal(false);
						return;
					}
					console.log(note);
					dispatch(createUserNote(note));
					setSubmitting(false);
					setSelectedCategory(null);
					setModal(false);
				}}
				validateOnMount
			>
				{({ isSubmitting, values, dirty, setFieldValue, handleReset }) => (
					<Form>
						<Row>
							<Col xs="8" sm="8" md="8" lg="9" xl="9">
								<TextField name="title" label="Title" />
							</Col>
							<Col className="text-right">
								<SwitchField
									name="importance"
									label="Important"
									onChange={() =>
										setFieldValue('importance', !values.importance)
									}
								/>
							</Col>
						</Row>
						<TextAreaField name="text" label="Text" />
						<Row className="align-items-center">
							<Col md="12" lg="9" xl="9">
								{values.file ? (
									<>
										<Row className="mb-3">
											<Col>
												<small
													className="text-muted pill-label"
													style={{
														textAlign: 'justify',
														fontWeight: '700',
														fontSize: 12,
													}}
												>
													Saved File: {values.file}
												</small>
											</Col>
											<Col xs="2" sm="2" md="1" className="text-right">
												<FontAwesomeIcon
													className="text-danger clickable"
													style={{
														textAlign: 'justify',
														fontWeight: '700',
														fontSize: 16,
													}}
													icon={faXmarkCircle}
													onClick={() => {
														setFieldValue('file', '');
														console.log(values.file);
													}}
												/>
											</Col>
										</Row>
									</>
								) : (
									<FileField name="file" label="File" />
								)}
							</Col>
							<Col className="text-right">
								<Button
									className="btn btn-light"
									color="null"
									onClick={addCategory}
								>
									{category ? (
										<FontAwesomeIcon icon={faMinus} />
									) : (
										<FontAwesomeIcon icon={faLayerGroup} />
									)}
								</Button>
							</Col>
						</Row>
						{note && note.categories && note.categories.length > 0 ? (
							<Row className="mt-3">
								<Col>
									<>
										<small
											className="text-info pill-label mb-3"
											style={{
												textAlign: 'justify',
												fontWeight: '700',
												fontSize: 15,
											}}
										>
											Categories
										</small>
										<Row>
											{note.categories.map((category, index) => (
												<React.Fragment key={index}>
													<Col xs="auto" className="mb-2">
														<small
															className="text-muted pill-label"
															style={{
																textAlign: 'justify',
																fontWeight: '700',
																fontSize: 12,
															}}
														>
															{category}
														</small>
													</Col>
													<Col xs="auto" className="text-right">
														<FontAwesomeIcon
															className="text-danger clickable"
															style={{
																textAlign: 'justify',
																fontWeight: '700',
																fontSize: 16,
															}}
															icon={faXmarkCircle}
															onClick={() => {
																deleteAlert(() => {
																	dispatch(
																		deleteCategory({
																			noteId: editNoteId,
																			category: { category },
																		})
																	);
																	setModal(false);
																});
															}}
														/>
													</Col>
												</React.Fragment>
											))}
										</Row>
									</>
								</Col>
							</Row>
						) : null}
						{category ? (
							<>
								<FormGroup className="form-floating mb-3 mt-2" floating>
									<CreatableSelect
										name="categories"
										components={components}
										inputValue={inputValue}
										isClearable
										isMulti
										menuIsOpen={false}
										onChange={(newValue) => setValue(newValue)}
										onInputChange={(newValue) => setInputValue(newValue)}
										onKeyDown={(event) =>
											handleKeyDown(event, setFieldValue, values)
										}
										placeholder="Insert a category . . ."
										value={value}
									>
										{value.map((option) => (
											<div key={option.label}>
												<div
													onClick={() =>
														setSelectedColor(
															categoryColors[option.label] || null
														)
													}
													style={{
														backgroundColor:
															categoryColors[option.label] || 'transparent',
													}}
												>
													{option.label}
												</div>
											</div>
										))}
									</CreatableSelect>
									{selectedColor !== null && (
										<ChromePicker
											color={selectedColor}
											onChange={(color) => {
												setSelectedColor(color.hex);
												setCategoryColors((prevColors) => ({
													...prevColors,
													[inputValue]: color.hex,
												}));
											}}
										/>
									)}
									<ErrorMessage
										name="categories"
										component={FormErrorMessage}
									/>
								</FormGroup>
							</>
						) : null}
						<Row>
							<ClearButton
								onClick={() => {
									setValue([]);
									setInputValue('');
									showCategory(false);
									handleReset();
								}}
								disabled={!dirty || isSubmitting}
							/>
							<SubmitButton
								body={
									isSubmitting ? (
										<>
											Please wait <Spinner type="grow" size="sm" />
										</>
									) : isEditingNote ? (
										'Update'
									) : (
										'Post'
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
