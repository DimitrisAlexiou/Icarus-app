import * as Yup from 'yup';

export const AssignInstructorSchema = (selectedPart) =>
	Yup.object().shape({
		theoryInstructors: Yup.array().when(selectedPart, {
			is: 'theory',
			then: Yup.array().min(1, 'At least one theory instructor is required.'),
		}),
		labInstructors: Yup.array().when(selectedPart, {
			is: 'lab',
			then: Yup.array().min(1, 'At least one lab instructor is required.'),
		}),
	});
