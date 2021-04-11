const mongoose = require('mongoose');
const express = require('express');

const requireAuth = require('../middlewares/requireAuth');

const Track = mongoose.model('Track');

const router = express.Router();

router.use(requireAuth);

router.get('/tracks', async (request, response) => {
	const tracks = await Track.find({ userId: request.user._id });

	response.send(tracks);
});

router.post('/tracks', async (request, response) => {
	const { name, locations } = request.body;

	if (!name || !locations) {
		return response.status(422).send({ error: 'You must provide name and locations '});
	}

	try {
		const track = new Track({ name, locations });
		await track.save();

		response.send(track);
	} catch (error) {
		response.status(422).send({ error: error.message });
	}
});

module.exports = router;
