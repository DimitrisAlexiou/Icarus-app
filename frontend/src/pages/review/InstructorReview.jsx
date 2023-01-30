import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Row } from 'reactstrap';
import { createInstructorReview, reset } from '../../features/reviews/instructorReviewSlice';
import { Toast } from '../../constants/sweetAlertNotification';
import InstructorReviewForm from '../../components/review/InstructorReviewForm';
import CancelButton from '../../components/buttons/CancelButton';
import SubmitButton from '../../components/buttons/SubmitButton';
import Spinner from '../../components/boilerplate/Spinner';

export default function InstructorReview() {
	const { isError, isSuccess, isLoading, message } = useSelector(
		(state) => state.instructorReview
	);

	const [data, setFormData] = useState({
		good_organization: '',
		clear_comprehensive_answers: '',
		student_participation: '',
		course_consistency: '',
		instructor_approachable: '',
	});

	const [validated, setValidated] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	useEffect(() => {
		if (isError) {
			Toast.fire({
				title: 'Error!',
				text: message,
				icon: 'error',
			});
		}
		if (isSuccess) {
			Toast.fire({
				title: 'Success!',
				text: message,
				icon: 'success',
			});
			dispatch(reset());
			navigate('/review');
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
		dispatch(createInstructorReview(data));
	};

	if (isLoading) {
		return <Spinner />;
	}

	return (
		// isAuthenticated && (
		<>
			<h1 className="h3 mb-5 text-gray-800 font-weight-bold">Instructor Review !</h1>

			<Row className="justify-content-center">
				<div className="col-sm-12 col-md-10 col-lg-8 col-xl-8">
					<div className="card shadow mb-4">
						<div className="card-header py-3">
							<h6 className="m-0 font-weight-bold text-primary">Leave your review</h6>
						</div>
						<div className="card-body">
							<Form
								className="user validated-form"
								validated={validated}
								onSubmit={onSubmit}
								noValidate
							>
								<InstructorReviewForm onChange={onChange} data />

								<Row>
									<CancelButton url={'/review'} />
									<SubmitButton
										message={'Review Instructor'}
										disabled={isLoading}
									/>
								</Row>
							</Form>
						</div>
					</div>
				</div>
			</Row>
		</>
		// )
	);
}
