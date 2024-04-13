import * as Yup from 'yup';

export const GradeSchema = (type) => {
	return Yup.object().shape({
		[type]: Yup.number()
			.typeError(`${type} grade must be a number.`)
			.required(`${type} grade is required.`)
			.min(0, `${type} grade can not be negative.`)
			.max(10, `${type} grade must be at most 10.`),
	});
};
