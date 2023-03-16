import * as Yup from 'yup';

export const CyclesSchema = Yup.object().shape({
	names: Yup.array()
		.of(
			Yup.object().shape({
				cycle: Yup.string()
					.max(80, 'Cycle name must be 80 characters or less.')
					.required('Cycle name is required.'),
			})
		)
		.required('Please define at least one cycle.'),
});
