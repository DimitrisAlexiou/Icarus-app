import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FormGroup, Label, Row, Col, Button, Input, Spinner } from 'reactstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDroplet } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { NoteSchema } from '../../schemas/Note';
import { createUserNote, updateUserNote } from '../../features/notes/noteSlice';
// import { SketchPicker } from 'react-color';
// import chroma from 'chroma-js';
import CreatableSelect from 'react-select/creatable';
import FormErrorMessage from '../form/FormErrorMessage';

export default function NoteForm({
	note,
	user,
	isEditingNote,
	editNoteId,
	setSelectedCategory,
	setFieldValue,
}) {
	const [inputValue, setInputValue] = useState('');
	const [value, setValue] = useState([]);
	const [category, showCategory] = useState(false);
	// const [color, setColor] = useState('#6610f2');
	// const [showColorPicker, setShowColorPicker] = useState(false);

	const components = {
		DropdownIndicator: null,
	};

	const createOption = (label) => ({
		label,
		value: label,
	});
	// const createOption = (label, color) => ({
	// 	label,
	// 	value: label,
	// 	color,
	// });

	const addCategory = () => {
		setInputValue('');
		setValue([]);
		showCategory(!category);
	};

	const handleKeyDown = (event) => {
		if (!inputValue) return;
		switch (event.key) {
			case 'Enter':
			case 'Tab':
				const newOption = createOption(inputValue);
				const categoryExists = value.find((option) => option.label === newOption.label);
				if (categoryExists) {
					setFieldValue('categories', [...value]);
				} else {
					setFieldValue('categories', [...value, newOption]);
					setValue((prev) => [...prev, newOption]);
				}
				setInputValue('');
				event.preventDefault();
				break;
			default:
				break;
		}
	};
	// const handleKeyDown = (event) => {
	// 	if (!inputValue) return;
	// 	switch (event.key) {
	// 		case 'Enter':
	// 		case 'Tab':
	// 			const newOption = createOption(inputValue, color);
	// 			setFieldValue('categories', [...value, newOption]);
	// 			setValue((prev) => [...prev, newOption]);
	// 			setInputValue('');
	// 			event.preventDefault();
	// 			break;
	// 		case 'c':
	// 			const lastOption = value[value.length - 1];
	// 			console.log(lastOption);
	// 			if (lastOption) {
	// 				const updatedOption = {
	// 					...lastOption,
	// 					showColorPicker: !lastOption.showColorPicker,
	// 				};
	// 				setValue([...value.slice(0, -1), updatedOption]);
	// 			}
	// 			break;
	// 		default:
	// 			break;
	// 	}
	// };

	// const styles = {
	// 	option: (styles, { data, isSelected }) => {
	// 		const color = chroma(data.color);
	// 		return {
	// 			...styles,
	// 			backgroundColor: isSelected ? color.alpha(0.1).css() : null,
	// 			color: isSelected ? color.darken(2).hex() : color.hex(),
	// 			cursor: 'pointer',
	// 		};
	// 	},
	// 	multiValue: (styles, { data }) => {
	// 		const color = chroma(data.color);
	// 		return {
	// 			...styles,
	// 			backgroundColor: color.alpha(0.1).css(),
	// 		};
	// 	},
	// 	multiValueLabel: (styles, { data }) => ({
	// 		...styles,
	// 		color: data.color,
	// 	}),
	// 	multiValueRemove: (styles, { data }) => ({
	// 		...styles,
	// 		color: data.color,
	// 		':hover': {
	// 			backgroundColor: data.color,
	// 			color: 'white',
	// 		},
	// 	}),
	// };

	// const Option = (props) => {
	// 	const {
	// 		data: { label, color },
	// 		innerProps,
	// 	} = props;
	// 	return (
	// 		<components.Option {...props}>
	// 			<div {...innerProps}>
	// 				<div
	// 					style={{
	// 						width: 20,
	// 						height: 20,
	// 						backgroundColor: color,
	// 						marginRight: 10,
	// 					}}
	// 				/>
	// 				{label}
	// 			</div>
	// 		</components.Option>
	// 	);
	// };

	// const Value = (props) => {
	// 	const {
	// 		data: { label, color },
	// 		innerProps,
	// 	} = props;
	// 	return (
	// 		<components.Value {...props}>
	// 			<div {...innerProps}>
	// 				<div
	// 					style={{
	// 						width: 20,
	// 						height: 20,
	// 						backgroundColor: color,
	// 						marginRight: 10,
	// 					}}
	// 					onClick={(e) => {
	// 						e.stopPropagation();
	// 						const newValue = [...props.getValue()];
	// 						const index = newValue.findIndex(
	// 							(option) => option.value === props.data.value
	// 						);
	// 						newValue[index].showColorPicker = !newValue[index].showColorPicker;
	// 						props.setValue(newValue);
	// 					}}
	// 				/>
	// 				{label}
	// 				{props.data.showColorPicker ? (
	// 					<SketchPicker
	// 						color={color}
	// 						onChange={(color) => {
	// 							const newValue = [...props.getValue()];
	// 							const index = newValue.findIndex(
	// 								(option) => option.value === props.data.value
	// 							);
	// 							newValue[index].color = color.hex;
	// 							newValue[index].showColorPicker = false;
	// 							props.setValue(newValue);
	// 						}}
	// 					/>
	// 				):null}
	// 			</div>
	// 		</components.Value>
	// 	);
	// };

	const dispatch = useDispatch();
	const navigate = useNavigate();

	return (
		<>
			<Formik
				initialValues={{
					title: note ? note.title : '',
					text: note ? note.text : '',
					file: '',
					// file: note ? note.file : '',
					categories: note ? note.categories : [],
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
						owner: user._id,
					};
					if (isEditingNote) {
						console.log(note);
						dispatch(updateUserNote({ noteId: editNoteId, data: note }));
						setSubmitting(false);
						return;
					}
					console.log(note);
					dispatch(createUserNote(note));
					setSubmitting(false);
					setSelectedCategory(null);
					navigate('/note');
				}}
				validateOnMount
			>
				{({ isSubmitting, values, setFieldValue, dirty, handleReset }) => (
					<Form>
						<Row>
							<Col xs="8" sm="8" md="8" lg="9" xl="9">
								<FormGroup className="form-floating mb-3" floating>
									<Field type="text" className="form-control" name="title" />
									<Label for="title" className="text-gray-600">
										Title
									</Label>
									<ErrorMessage name="title" component={FormErrorMessage} />
								</FormGroup>
							</Col>
							<Col className="text-right">
								<FormGroup switch>
									<Field name="importance">
										{({ field }) => (
											<Input
												type="switch"
												role="switch"
												name="importance"
												checked={field.value}
												onChange={() =>
													setFieldValue('importance', !values.importance)
												}
											/>
										)}
									</Field>
									<Label for="importance" className="mx-1 text-gray-600">
										Important
									</Label>
									<ErrorMessage name="importance" component={FormErrorMessage} />
								</FormGroup>
							</Col>
						</Row>

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

						<Row>
							<Col md="12" lg="6">
								<FormGroup className="mb-3">
									<Label for="file" className="text-gray-500">
										File
									</Label>
									<Field name="file" type="file" className="form-control" />
									<ErrorMessage name="file" component={FormErrorMessage} />
								</FormGroup>
							</Col>
							<Col className="text-right">
								<Button
									className="btn btn-light"
									color="null"
									onClick={addCategory}
								>
									Category <FontAwesomeIcon icon={faPlus} />
								</Button>
							</Col>
						</Row>

						{category ? (
							<>
								{/* <Row>
							{value.map((option, index) => (
								<Col
									key={option.value}
									xs="12"
									sm="12"
									md="6"
									lg="4"
									xl="2"
									className="mb-3 mt-3"
								>
									<div
										className="d-flex align-items-center"
										onClick={() => {
											const newValue = [...value];
											newValue[index].showColorPicker =
												!option.showColorPicker;
											setValue(newValue);
										}}
									>
										<div
											style={{
												width: 20,
												height: 20,
											}}
										>
											<FontAwesomeIcon
												icon={faDroplet}
												color={option.color}
											/>
										</div>
										<div className="mx-2" style={{ color: option.color }}>
											{option.label}
										</div>
									</div>
									{option.showColorPicker ? (
										<div
											className="position-absolute"
											style={{
												top: '-10rem',
												left: '5rem',
												zIndex: 999,
											}}
										>
											<SketchPicker
												color={option.color}
												onChange={(color) => {
													const newValue = [...value];
													newValue[index].color = color.hex;
													newValue[index].showColorPicker = false;
													setValue(newValue);
												}}
											/>
										</div>
									): null}
								</Col>
							))}
						</Row> */}

								<FormGroup className="form-floating mb-3 mt-2" floating>
									<CreatableSelect
										name="categories"
										components={components}
										// components={{ ...components, Option, Value }}
										inputValue={inputValue}
										isClearable
										isMulti
										menuIsOpen={false}
										onChange={(newValue) => setValue(newValue)}
										onInputChange={(newValue) => setInputValue(newValue)}
										onKeyDown={handleKeyDown}
										placeholder="Insert a category . . ."
										value={value}
										// styles={styles}
									/>
									<ErrorMessage name="categories" component={FormErrorMessage} />
								</FormGroup>
							</>
						) : null}

						<Row className="mt-4">
							<Col className="mb-3">
								<Button
									onClick={() => {
										setValue([]);
										setInputValue('');
										showCategory(false);
										handleReset();
									}}
									disabled={!dirty || isSubmitting}
								>
									Clear
								</Button>
							</Col>
							<Col className="text-right">
								<Button color="primary" type="submit" disabled={isSubmitting}>
									{isSubmitting ? (
										<>
											Please wait <Spinner type="grow" size="sm" />
										</>
									) : isEditingNote ? (
										'Update'
									) : (
										'Post'
									)}
								</Button>
							</Col>
						</Row>
					</Form>
				)}
			</Formik>
		</>
	);
}
