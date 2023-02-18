const asyncHandler = require('express-async-handler');
const Cycles = require('../../models/admin/cycles');

//TODO Define Cycles
module.exports.defineCycles = asyncHandler(async (req, res) => {
	// const { number, cycle } = req.body;
	// if (!number || !cycle) {
	//      return res.status(400).json('Please provide the required fields to define cycles!');
	//  }
	const { cycle } = req.body;
	if (!cycle) {
		return res.status(400).json('Please provide the required fields to define cycles!');
	}
	try {
		const cycles = await Cycles.findOne({ name: cycle });
		if (cycles) {
			return res.status(400).json('Seems like cycles are already defined!');
		} else {
			try {
				const newCycles = await Cycles.create({
					cycle,
					status: 'new',
				});
				return res.status(201).json(newCycles);
			} catch (error) {
				console.error('❌ Error while defining cycles: ', error);
				return res.status(500).json(`${error.message}`);
			}
		}
	} catch (error) {
		console.error('❌ Error while checking if cycles already defined: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

module.exports.viewCycles = asyncHandler(async (_, res) => {
	try {
		const cycles = await Cycles.find({});
		if (cycles.length === 0) {
			return res.status(404).json('Seems like there are no defined cycles!');
		} else {
			return res.status(200).json(cycles);
		}
	} catch (error) {
		console.error('❌ Error while finding current cycles: ', error);
		return res.status(500).json(`${error.message}`);
	}
});
