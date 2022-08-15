const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cyclesSchema = new Schema({
	// number: {
	//     type: Number,
	//     required: true,
	// },
	cycles: [
		{
			type: String,
			required: true,
		},
	],
});

module.exports = mongoose.model('Cycles', cyclesSchema);
