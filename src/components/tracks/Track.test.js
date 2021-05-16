let mongoose = require("mongoose");
let Track = require('./Track');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../main/server');
let should = chai.should();

chai.use(chaiHttp);

describe('Trackers', () => {
	// beforeEach((done) => {
	// 	Track.remove([{}], (error) => {
	// 		done();
	// 	});
	// });

	describe('/GET Tracks', () => {
		it('it should GET all the tracks', (done) => {
			chai.request(server)
				.get('/api/tracks/')
				.end((error, response) => {
					response.should.have.status(200);
					response.body.should.be.a('array');
					response.body.length.should.be.eql(0);
					done();
				});
		});
	});
});

