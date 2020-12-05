const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
	// Get token from header
	const token = req.header('x-auth-token');
	// Check if not token
	if (!token) {
		return res.status(401).json({ msg: 'No token, authorization denied' });
	}

	try {
		const decoded = jwt.verify(token, config.get('jwtSecret'));
		console.log('What is decoded here?: ', decoded);
		req.client = decoded.client;
		console.log('What is req.client here? ', req.client);
		next();
	} catch (err) {
		console.log(err);
		res.status(401).json({ msg: 'Token is not valid' });
	}
};
