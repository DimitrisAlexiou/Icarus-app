const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cyclesSchema = new Schema({
	names: [
		{
			cycle: {
				type: String,
				required: true,
			},
		},
	],
});

module.exports = mongoose.model('Cycles', cyclesSchema);
