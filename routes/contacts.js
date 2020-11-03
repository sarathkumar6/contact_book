const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

// @route       GET api/users
// @desc        Get all contacts of a user
// @access      Private
router.get('/', auth, async (request, response) => {
	try {
		const contacts = await Contact.find({ user: request.user.id }).sort({ date: -1 });
		response.json(contacts);
	} catch (err) {
		console.log(err.message);
		response.status(500).send('Server Error');
	}
});

// @route       POST api/users
// @desc        Add a contact to a user
// @access      Private
router.post('/', [ auth, [ check('name', 'Please enter a name').not().isEmpty() ] ], async (request, response) => {
	const errors = validationResult(request);
	if (!errors.isEmpty()) {
		return response.status(400).json({ errors: errors.array() });
	}
	const { name, email, phone, type } = request.body;
	try {
		const newContact = new Contact({
			name,
			email,
			phone,
			type,
			user: request.user.id
		});

		const contact = await newContact.save();
		response.json(contact);
	} catch (err) {
		console.log(err.message);
		response.status(500).send('Server Error');
	}
});

// @route       PUT api/users
// @desc        Get all contacts of a user
// @access      Private
router.put('/:id', auth, async (request, response) => {
	const { name, email, phone, type } = request.body;
	const contactFields = {};
	if (name) contactFields.name = name;
	if (email) contactFields.email = email;
	if (phone) contactFields.phone = phone;
	if (type) contactFields.type = type;

	try {
		let contact = await Contact.findById(request.params.id);

		if (!contact) {
			return response.status(404).json({ message: 'Contact not found' });
		}
		if (contact.user.toString() !== request.user.id) {
			return response.status(401).json({ message: 'Not authorized to update contact' });
		}
		contact = await Contact.findByIdAndUpdate(request.params.id, { $set: contactFields }, { new: true });
		response.json(contact);
	} catch (err) {
		console.log(err.message);
		response.status(500).send('Server Error');
	}
});

// @route       DELETE api/users
// @desc        Delete a contact of a user
// @access      Private
router.delete('/:id', auth, async (request, response) => {
	try {
		let contact = await Contact.findById(request.params.id);

		if (!contact) {
			return response.status(404).json({ message: 'Contact not found' });
		}
		if (contact.user.toString() !== request.user.id) {
			return response.status(401).json({ message: 'Not authorized to update contact' });
		}
		await Contact.findByIdAndRemove(request.params.id);
		response.json({ message: 'Contact removed' });
	} catch (err) {
		console.log(err.message);
		response.status(500).send('Server Error');
	}
});
module.exports = router;
