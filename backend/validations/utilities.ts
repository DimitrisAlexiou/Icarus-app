import Joi from 'joi';

export const noteSchema = Joi.object({
	title: Joi.string().max(40).required(),
	text: Joi.string().max(800).required(),
	file: Joi.string().allow('').optional().empty(),
	categories: Joi.array().items(Joi.string()),
	importance: Joi.boolean().default(false),
	owner: Joi.string().required(),
});

export const eventSchema = Joi.object({
	title: Joi.string().max(50).required(),
	startDate: Joi.date().required(),
	endDate: Joi.date().required(),
	allDay: Joi.boolean().required(),
});

export const announcementSchema = Joi.object({
	title: Joi.string().required(),
	text: Joi.string().required(),
	publishDate: Joi.date().required(),
	updateDate: Joi.date().optional(),
	visibility: Joi.number().greater(0).required(),
	isVisible: Joi.boolean().default(false).required(),
	teaching: Joi.string().required(),
});
