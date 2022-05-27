import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { createCourse, reset } from '../features/courses/courseSlice';
import {
	Form,
	FormGroup,
	FormFeedback,
	Button,
	Input,
	Label,
	Spinner,
} from 'reactstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import CourseForm from '../components/CourseForm';

const MySwal = withReactContent(Swal);
const Toast = MySwal.mixin({
	toast: true,
	position: 'top-right',
	iconColor: 'white',
	customClass: {
		popup: 'colored-toast',
	},
	showConfirmButton: false,
	timer: 1500,
	timerProgressBar: true,
});

export default function NewCourse() {
	// const { user, isAuthenticated, isLoading } = useAuth0();
	const { isError, isSuccess, isLoading, message } = useSelector(
		(state) => state.courses,
	);

	const [formCourseData, setFormData] = useState({
		cid: '',
		title: '',
		type: '',
		description: '',
		// description: 'Please enter a description of the course..',
		semester: '',
		year: '',
		cycle: '',
		ects: 0,
		hasLab: false,
		isObligatory: false,
		isActive: false,
	});

	const [validated, setValidated] = useState(false);
	const [hasLab, setHasLab] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onChangeCheckBox = (e) => {
		setHasLab(!hasLab);
	};

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	useEffect(() => {
		if (isError) {
			Toast.fire({
				animation: 'true',
				title: 'Error!',
				text: message,
				icon: 'error',
			});
		}
		if (isSuccess) {
			Toast.fire({
				animation: 'true',
				title: 'Success!',
				text: message,
				icon: 'success',
			});
			dispatch(reset());
			navigate('/course');
		}
		dispatch(reset());
	}, [dispatch, isError, isSuccess, message, navigate]);

	const onSubmit = (e) => {
		const form = e.target;
		if (form.checkValidity() === false) {
			e.preventDefault();
			e.stopPropagation();
		}
		setValidated(true);
		dispatch(createCourse(formCourseData));
		setFormData(formCourseData);
	};

	if (isLoading) {
		return (
			<Spinner color="primary" type="grow">
				Loading...
			</Spinner>
		);
	}

	return (
		// isAuthenticated && (
		// 	<>
		<div id="content-wrapper" className="d-flex flex-column">
			<div id="content">
				<div>
					<h1 className="h3 mb-5 text-gray-800 font-weight-bold">
						Create new Course !
					</h1>
					<div className="row justify-content-center">
						<div className="col-sm-12 col-md-10 col-lg-8 col-xl-6">
							<div className="card shadow mb-4">
								<div className="card-header py-3">
									<h6 className="m-0 font-weight-bold text-primary">
										Fill the form below to create a new course
									</h6>
								</div>
								<div className="card-body">
									<Form
										className="user validated-form"
										validated={validated}
										onSubmit={onSubmit}
										noValidate
									>
										{/* <CourseForm onChange={onChange} formCourseData /> */}
										<FormGroup className="form-floating mb-3" floating>
											<Input
												type="text"
												className="form-control"
												id="cid"
												name="cid"
												value={formCourseData.cid}
												onChange={onChange}
												required
											/>
											<Label for="cid" className="text-gray-600">
												Course ID
											</Label>
											<FormFeedback type="invalid">
												Please provide a course ID !
											</FormFeedback>
										</FormGroup>

										<FormGroup className="form-floating mb-3" floating>
											<Input
												type="text"
												className="form-control"
												id="title"
												name="title"
												value={formCourseData.title}
												onChange={onChange}
												required
											/>
											<Label for="title" className="text-gray-600">
												Course Title
											</Label>
											<FormFeedback type="invalid">
												Please provide course title !
											</FormFeedback>
										</FormGroup>

										<FormGroup className="form-floating mb-3" floating>
											<Input
												type="select"
												className="form-control"
												id="type"
												name="type"
												value={formCourseData.type}
												onChange={onChange}
												required
											>
												<option default>Select course type</option>
												<option>Undergraduate</option>
												<option>Master</option>
												<option>Mixed</option>
											</Input>
											<Label for="type" className="text-gray-600">
												Course Type
											</Label>
											<FormFeedback type="invalid">
												Please select the type of course !
											</FormFeedback>
										</FormGroup>

										<FormGroup className="form-floating mb-3" floating>
											<Input
												type="textarea"
												className="form-control"
												style={{ height: '180px', text_align: 'justify' }}
												id="description"
												name="description"
												value={formCourseData.description}
												onChange={onChange}
												required
											/>
											<Label for="description" className="text-gray-600">
												Course Description
											</Label>
											<FormFeedback type="invalid">
												Please provide a description for the course !
											</FormFeedback>
										</FormGroup>

										<FormGroup className="form-floating mb-3" floating>
											<Input
												type="select"
												className="form-control"
												id="semester"
												name="semester"
												value={formCourseData.semester}
												onChange={onChange}
												required
											>
												<option default>Select course semester</option>
												<option>Winter</option>
												<option>Spring</option>
												<option>Any</option>
											</Input>
											<Label for="semester" className="text-gray-600">
												Course Semester
											</Label>
											<FormFeedback type="invalid">
												Please select the course semester !
											</FormFeedback>
										</FormGroup>

										<FormGroup className="form-floating mb-3" floating>
											<Input
												type="select"
												className="form-control"
												id="year"
												name="year"
												value={formCourseData.year}
												onChange={onChange}
												required
											>
												<option default>Select course year</option>
												<option>1</option>
												<option>2</option>
												<option disabled={formCourseData.type === 'master'}>
													3
												</option>
												<option disabled={formCourseData.type === 'master'}>
													4
												</option>
												<option disabled={formCourseData.type === 'master'}>
													5
												</option>
											</Input>
											<Label for="year" className="text-gray-600">
												Course Year
											</Label>
											<FormFeedback type="invalid">
												Please select the course year !
											</FormFeedback>
										</FormGroup>

										<FormGroup className="form-floating mb-3" floating>
											<Input
												type="select"
												min="1"
												max="5"
												className="form-control"
												id="cycle"
												name="cycle"
												value={formCourseData.cycle}
												onChange={onChange}
												required
											>
												<option default>Select course cycle</option>
												<option>Security</option>
												<option>Software Engineering</option>
												<option>Information Systems</option>
												<option>Communication Systems</option>
												<option>AI</option>
											</Input>
											<Label for="cycle" className="text-gray-600">
												Course Cycle
											</Label>
											<FormFeedback type="invalid">
												Please select the course cycle !
											</FormFeedback>
										</FormGroup>

										<FormGroup className="form-floating mb-3" floating>
											<Input
												type="number"
												min="0"
												className="form-control"
												id="ects"
												name="ects"
												value={formCourseData.ects}
												onChange={onChange}
												required
											/>
											<Label for="ects" className="text-gray-600">
												Course ECTS
											</Label>
											<FormFeedback type="invalid">
												Please provide the course ECTS !
											</FormFeedback>
										</FormGroup>

										<FormGroup className="mx-1 mb-3" check>
											<Input
												type="checkbox"
												id="hasLab"
												name="hasLab"
												value={hasLab}
												defaultChecked={false}
												onChangeCheckBox={onChangeCheckBox}
												// onChangeCheckBox={() => setHasLab(!hasLab)}
												required
											/>
											<Label for="hasLab" className="text-gray-500">
												Course Lab
											</Label>
										</FormGroup>

										<FormGroup className="mx-1 mb-3" check>
											<Input
												type="checkbox"
												id="isObligatory"
												name="isObligatory"
												value={formCourseData.isObligatory}
												// onChangeCheckBox={checked ? 'true' : 'false'}
												// ={onChangeCheckBox}
												// onChange={onChange}
												required
											/>
											<Label for="isObligatory" className="text-gray-500">
												Obligatory Course
											</Label>
										</FormGroup>

										<FormGroup>
											<Input
												type="hidden"
												id="isActive"
												name="isActive"
												value={formCourseData.isActive}
												required
											/>
										</FormGroup>

										<div className="form-group row">
											<div className="col-sm-6 mb-3 mb-sm-0">
												<Link to="/course">
													<Button>Cancel</Button>
												</Link>
											</div>
											<div className="col-sm-6 mb-3 mb-sm-0 text-right">
												<Button type="submit" color="primary">
													Create Course
												</Button>
											</div>
										</div>
									</Form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		// 	</>
		// )
	);
}
