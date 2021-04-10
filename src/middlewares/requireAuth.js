const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = (request, response, next) => {
	// Express downcase any headers naming
	const { authorization } = request.headers; // authorization === 'Bearer aidasidjiasjdiasjdjasdasd'

	if (!authorization) {
		return response.status(401).send({ error: 'You must be logged in.'});
	}

	const token = authorization.replace('Bearer ', ''); // Replace Bearer with empty string

	jwt.verify(token, 'MY_SECRET_KEY', async (error, payload) => {
		if (error) {
			return response.status(401).send({ error: 'You must be logged in.' });
		}

		const { userId } = payload;

		const userData = await User.findById(userId);
		request.user = userData;

		next();
	});

};
