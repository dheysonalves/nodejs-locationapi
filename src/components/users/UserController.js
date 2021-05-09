const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const User = mongoose.model('User');

const signup = async (request, response) => {
	try {
		const { email, password } = request.body;

		const user = new User({ email, password });
		await user.save();

		const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');

		response.send({ token });
	} catch (error) {
		return response.status(422).send(error.message);
	}
}

const signin = async (request, response) => {
	const { email, password } = request.body;

	if (!email || !password) {
		return response.status(422).send({ error: 'You must provide email and password ' });
	}

	const user = await User.findOne({ email });

	if (!user) {
		return response.status(422).send({ error: 'Invalid password or email' });
	}

	try {
		await user.comparePassword(password);
		const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
		response.send({ token });
	} catch (error) {
		return response.status(422).send({ error: 'Invalid password or email' });
	}

}

module.exports = {
	signin,
	signup
};
