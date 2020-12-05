const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');
const auth = require('../middleware/auth');
const { validationResult } = require('express-validator');

// @route       GET api/activities
// @desc        Get all the activities recorded by a farmer
// @access      Private
router.get('/', auth, async (request, response) => {
	try {
		const activities = await Activity.find({ user: request.user.id }).sort({ date: -1 });
		response.json(activities);
	} catch (err) {
		response.status(500).send(err.message);
	}
});

// @route       POST api/activities
// @desc        Add a feeding activity to a farmer
// @access      Private
router.post('/', [ auth ], async (request, response) => {
	const errors = validationResult(request);
	if (!errors.isEmpty()) {
		return response.status(400).json({ errors: errors.array() });
	}
	const { numberOfDucks, food, foodType, country, foodQuantity } = request.body;
	try {
		const newActivity = new Activity({
			user: request.user.id,
			numberOfDucks,
			food,
			foodType,
			foodQuantity,
			country
		});

		const activity = await newActivity.save();
		response.json(activity);
	} catch (err) {
		console.log(err);
		response.status(500).send(err.message);
	}
});

// @route       PUT api/activities
// @desc        Update a feeding activity of a farmer
// @access      Private
router.put('/:id', auth, async (request, response) => {
	const { numberOfDucks, food, foodType, country, foodQuantity } = request.body;
	const activityFields = {};

	if (numberOfDucks) activityFields.numberOfDucks = numberOfDucks;
	if (food) activityFields.food = food;
	if (foodType) activityFields.foodType = foodType;
	if (foodQuantity) activityFields.foodQuantity = foodQuantity;
	if (country) activityFields.country = country;

	try {
		let activity = await Activity.findById(request.params.id);

		if (!activity) {
			return response.status(404).json({ message: 'Activity not found' });
		}
		if (activity.user.toString() !== request.user.id) {
			return response.status(401).json({ message: 'Not authorized to update activity' });
		}
		activity = await Activity.findByIdAndUpdate(request.params.id, { $set: activityFields }, { new: true });
		response.json(activity);
	} catch (err) {
		response.status(500).send(err.message);
	}
});

// @route       DELETE api/activities
// @desc        Delete a feeding activity of a farmer
// @access      Private
router.delete('/:id', auth, async (request, response) => {
	try {
		let activity = await Activity.findById(request.params.id);

		if (!activity) {
			return response.status(404).json({ message: 'Activity not found' });
		}
		if (activity.user.toString() !== request.user.id) {
			return response.status(401).json({ message: 'Not authorized to update activity' });
		}
		await Activity.findByIdAndRemove(request.params.id);
		response.json({ message: 'Activity removed' });
	} catch (err) {
		response.status(500).send(err.message);
	}
});
module.exports = router;
