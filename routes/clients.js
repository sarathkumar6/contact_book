const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const Client = require('../models/Client');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

// @route       POST api/clients
// @desc        Register a client
// @access      Public
router.post(
	'/',
	[
		check('name', 'Please enter name').not().isEmpty(),
		check('email', 'Please enter a valid email').isEmail(),
		check('password', 'Please enter a password with 8 or more characters').isLength({ min: 8 }),
		check('type', 'Please enter a client type').not().isEmpty()
	],
	async (request, response) => {
		console.log(request.body);
		const errors = validationResult(request);
		if (!errors.isEmpty()) {
			return response.status(400).json({ errors: errors.array() });
		}
		const { name, email, password, type } = request.body;
		try {
			let client = await Client.findOne({ email });
			console.log('client: ', client);
			if (client) {
				return response.status(400).json({ message: 'Client already exists' });
			}
			client = new Client({
				name,
				email,
				password,
				type
			});
			const salt = await bcrypt.genSalt(10);
			client.password = await bcrypt.hash(password, salt);
			await client.save();

			const payload = {
				client: {
					id: client.id
				}
			};
			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{
					expiresIn: 240000
				},
				(err, token) => {
					if (err) {
						throw err;
					} else {
						response.json({ token });
					}
				}
			);
		} catch (err) {
			console.log(err);
			response.status(500).send(err.message);
		}
	}
);

module.exports = router;
