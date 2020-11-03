const express = require('express');
const router = express.Router();

// @route       GET api/users
// @desc        Get all contacts of a user
// @access      Private
router.get('/', (request, response) => {
	response.send('Get all contacts');
});

// @route       POST api/users
// @desc        Add a contact to a user
// @access      Private
router.post('/', (request, response) => {
	response.send('Add a contact');
});

// @route       PUT api/users
// @desc        Get all contacts of a user
// @access      Private
router.put('/:id', (request, response) => {
	console.log(request.params);
	response.send(`Update contacts ${request.params.id}`);
});

// @route       DELETE api/users
// @desc        Delete a contact of a user
// @access      Private
router.delete('/', (request, response) => {
	response.send('Delete a Contact');
});
module.exports = router;
