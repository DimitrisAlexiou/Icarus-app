const asyncHandler = require('express-async-handler');
const Cycles = require('../../models/admin/cycles');

module.exports.defineCycles = asyncHandler(async (req, res) => {
	const { names } = req.body;
	if (!names) {
		return res
			.status(400)
			.json({ message: 'Please provide the required fields to define cycles!' });
	}
	try {
		const cycles = await Cycles.findOne({});
		if (cycles) {
			return res.status(400).json({ message: 'Seems like cycles are already defined!' });
		} else {
			try {
				const newCycles = await Cycles.create({
					names,
					status: 'new',
				});
				return res.status(201).json(newCycles);
			} catch (error) {
				console.error('❌ Error while defining cycles: ', error);
				return res.status(500).json({
					message: 'Something went wrong, unfortunately the cycled did not defined!',
				});
			}
		}
	} catch (error) {
		console.error('❌ Error while checking if cycles already defined: ', error);
		return res.status(500).json({
			message: 'Something went wrong, try again later!',
		});
	}
});

module.exports.getCycles = asyncHandler(async (_, res) => {
	try {
		const cycles = await Cycles.findOne({});
		if (!cycles) {
			return res.status(404).json({ message: 'Seems like there are no defined cycles!' });
		} else {
			return res.status(200).json(cycles);
		}
	} catch (error) {
		console.error('❌ Error while finding current cycles: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later!' });
	}
});

module.exports.updateCycles = asyncHandler(async (req, res) => {
	const { names } = req.body;

	if (!names) {
		return res
			.status(400)
			.json({ message: 'Please provide the required fields to define cycles!' });
	}

	try {
		const cycles = await Cycles.findOne({});
		if (!cycles) {
			return res.status(404).json({ message: 'Seems like there are no defined cycles!' });
		} else {
			try {
				const updatedCycles = await Cycles.findOneAndUpdate(
					{
						...req.body,
					},
					{ new: true }
				);
				return res.status(200).json(updatedCycles);
			} catch (error) {
				console.error('❌ Error while updating current cycles: ', error);
				return res.status(500).json({
					message: 'Something went wrong, unfortunately the cycles did not updated!',
				});
			}
		}
	} catch (error) {
		console.error('❌ Error while finding current cycles: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later!' });
	}
});

module.exports.deleteCycles = asyncHandler(async (_, res) => {
	try {
		await Cycles.deleteOne({});
		return res.status(200).json({ message: 'Cycles deleted!' });
	} catch (error) {
		console.error('❌ Error while deleting cycles', error);
		return res.status(500).json({
			message: 'Something went wrong, try again later!',
		});
	}
});
