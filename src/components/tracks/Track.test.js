const request = require('supertest');
const mongoose = require("mongoose");
const server = require('../../main/server');

describe('Trackers Service', () => {
	// it should be authorazed
	describe('/GET Tracks', () => {
		it('should return status 200 with the request', function (done) {
			request(server)
				.get('/api/tracks')
				.set('Accept', 'application/json')
				.expect(200, done);
		});
	});

	describe('/POST Tracks', () => {
	});
});

