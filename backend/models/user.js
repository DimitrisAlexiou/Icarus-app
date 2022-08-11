const mongoose = require('mongoose');
const Note = require('./note');
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		surname: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
		notes: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Note',
			},
		],
	},
	{
		timestamps: true,
	},
);

userSchema.post('findOneAndDelete', async function (data) {
	if (data) {
		await Note.deleteMany({
			_id: {
				$in: data.notes,
			},
		});
	}
});

module.exports = mongoose.model('User', userSchema);
