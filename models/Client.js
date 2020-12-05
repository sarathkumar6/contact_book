const mongoose = require('mongoose');
const ClientSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		require: true
	},
	date: {
		type: Date,
		default: Date.now
	},
	type: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('client', ClientSchema);
