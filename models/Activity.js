const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

// @route       GET api/activities
// @desc        Get all the activities recorded by a farmer
// @access      Private
router.get('/', auth, async (request, response) => {
	try {
		const contacts = await Activity.find({ user: request.user.id }).sort({ date: -1 });
		response.json(contacts);
	} catch (err) {
		console.log(err.message);
		response.status(500).send('Server Error');
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
		const newContact = new Activity({
			user: request.user.id,
			numberOfDucks,
			food,
			foodType,
			foodQuantity,
			country
		});

		const contact = await newContact.save();
		response.json(contact);
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
	const contactFields = {};

	if (numberOfDucks) contactFields.numberOfDucks = numberOfDucks;
	if (food) contactFields.food = food;
	if (foodType) contactFields.foodType = foodType;
	if (foodQuantity) contactFields.foodQuantity = foodQuantity;
	if (country) contactFields.country = country;

	try {
		let contact = await Activity.findById(request.params.id);

		if (!contact) {
			return response.status(404).json({ message: 'Contact not found' });
		}
		if (contact.user.toString() !== request.user.id) {
			return response.status(401).json({ message: 'Not authorized to update contact' });
		}
		contact = await Activity.findByIdAndUpdate(request.params.id, { $set: contactFields }, { new: true });
		response.json(contact);
	} catch (err) {
		response.status(500).send(err.message);
	}
});

// @route       DELETE api/activities
// @desc        Delete a feeding activity of a farmer
// @access      Private
router.delete('/:id', auth, async (request, response) => {
	try {
		let contact = await Activity.findById(request.params.id);

		if (!contact) {
			return response.status(404).json({ message: 'Contact not found' });
		}
		if (contact.user.toString() !== request.user.id) {
			return response.status(401).json({ message: 'Not authorized to update contact' });
		}
		await Activity.findByIdAndRemove(request.params.id);
		response.json({ message: 'Contact removed' });
	} catch (err) {
		response.status(500).send(err.message);
	}
});
module.exports = router;

const mongoose = require('mongoose');

const ActivitySchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users'
	},
	date: {
		type: Date,
		default: Date.now
	},
	numberOfDucks: {
		type: Number,
		required: true
	},
	food: {
		type: String,
		required: true
	},
	foodType: {
		type: String,
		default: 'veggies'
	},
	foodQuantity: {
		type: Number,
		required: true
	},
	country: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('activity', ActivitySchema);
