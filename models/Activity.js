const mongoose = require('mongoose');
const moment = require('moment');

const ActivitySchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users'
	},
	date: {
		type: Date,
		default: moment()
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
