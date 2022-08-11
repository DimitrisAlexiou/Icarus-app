import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import {
	createTeachingReview,
	reset,
} from '../../features/reviews/teachingReviewSlice';
import { Form } from 'reactstrap';
import { Toast } from '../../constants/sweetAlertNotification';
import TeachingReviewForm from '../../components/review/TeachingReviewForm';
import CancelButton from '../../components/buttons/CancelButton';
import SubmitButton from '../../components/buttons/SubmitButton';
import Spinner from '../../components/boilerplate/Spinner';

export default function TeachingReview() {
	const { isAuthenticated, isLoading } = useAuth0();
	const {
		teachingReview,
		isError,
		isSuccess,
		isLoading: teachingReviewIsLoading,
		message,
	} = useSelector((state) => state.teachingReview);

	const [teachingReviewData, setFormData] = useState({
		clear_course_objectives: '',
		course_material: '',
		course_comprehension: '',
		examination_method: '',
		course_difficulty: '',
		course_activities: '',
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
		dispatch(createTeachingReview(teachingReviewData));
	};

	if (isLoading || teachingReviewIsLoading) {
		return <Spinner />;
	}

	return (
		isAuthenticated && (
			<>
				<div id="content-wrapper" className="d-flex flex-column">
					<div id="content">
						<div>
							<h1 className="h3 mb-5 text-gray-800 font-weight-bold">
								Teaching Review !
							</h1>
							<div className="row justify-content-center">
								<div className="col-sm-12 col-md-10 col-lg-8 col-xl-6">
									<div className="card shadow mb-4">
										<div className="card-header py-3">
											<h6 className="m-0 font-weight-bold text-primary">
												Leave your review
											</h6>
										</div>
										<div className="card-body">
											<Form
												className="user validated-form"
												validated={validated}
												onSubmit={onSubmit}
												noValidate
											>
												<TeachingReviewForm
													onChange={onChange}
													teachingReviewData
												/>

												<div className="row">
													<CancelButton url={'/review'} />
													<SubmitButton message={'Review Teaching'} />
												</div>
											</Form>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		)
	);
}
