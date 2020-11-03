const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

// @route       POST api/users
// @desc        Register a user
// @access      Public
router.post(
	'/',
	[
		check('name', 'Please enter name').not().isEmpty(),
		check('email', 'Please enter a valid email').isEmail(),
		check('password', 'Please enter a password with 8 or more characters').isLength({ min: 8 })
	],
	async (request, response) => {
		console.log(request.body);
		const errors = validationResult(request);
		if (!errors.isEmpty()) {
			return response.status(400).json({ errors: errors.array() });
		}
		const { name, email, password } = request.body;
		try {
			let user = await User.findOne({ email });
			console.log('user: ', user);
			if (user) {
				return response.status(400).json({ message: 'User already exists' });
			}
			user = new User({
				name,
				email,
				password
			});
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);
			await user.save();

			const payload = {
				user: {
					id: user.id
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
			response.status(500).send('Server Error');
		}
	}
);

module.exports = router;
