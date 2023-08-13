import * as Yup from 'yup';

export const CycleSchema = Yup.object().shape({
	cycle: Yup.array()
		.of(
			Yup.string()
				.max(80, 'Cycle name must be 80 characters or less.')
				.required('Cycle name is required.')
		)
		.required('Please define at least one cycle.'),
});

export const CycleEditSchema = Yup.object().shape({
	cycle: Yup.string()
		.max(80, 'Cycle name must be 80 characters or less.')
		.required('Cycle name is required.'),
});
