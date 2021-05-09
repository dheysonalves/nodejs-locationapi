const mongoose = require('mongoose');
const express = require('express');

const Track = mongoose.model('Track');

const index = async (request, response) => {
	const tracks = await Track.find({ userId: request.user._id });

	response.send(tracks);
};

const store = async (request, response) => {
	const { name, locations } = request.body;

	if (!name || !locations) {
		return response.status(422).send({ error: 'You must provide name and locations ' });
	}

	try {
		const track = new Track({ name, locations });
		await track.save();

		response.send(track);
	} catch (error) {
		response.status(422).send({ error: error.message });
	}
};


module.exports = {
	store,
	index
};
