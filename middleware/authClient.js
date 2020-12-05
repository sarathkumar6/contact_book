const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
	// Get token from header
	const token = req.header('x-auth-token');
	console.log('Token is: ', token);
	// Check if not token
	if (!token) {
		return res.status(401).json({ msg: 'No token, authorization denied' });
	}

	try {
		const decoded = jwt.verify(token, config.get('jwtSecret'));
		req.client = decoded.client;
		next();
	} catch (err) {
		console.log(err);
		res.status(401).json({ msg: 'Token is not valid' });
	}
};
