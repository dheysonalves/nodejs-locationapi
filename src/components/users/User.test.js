const request = require('supertest');
let server = require('../../main/server');

const MOCK_USER = {
	name: 'John Walker',
	email: `jonny_walker${Math.random()}@gmail.com`,
	password: 'asd21324123'
};

describe('User signup POST', () => {
	it('should return status 200 with the request', function (done) {
		request(server)
			.post('/api/users/signup')
			.send(MOCK_USER)
			.set('Accept', 'application/json')
			.expect(200, done);
	});

	it('should return status 422 with the request', function (done) {
		request(server)
			.post('/api/users/signup')
			.send(MOCK_USER)
			.set('Accept', 'application/json')
			.expect(422, { error: 'It already exist an user with this email', message: `E11000 duplicate key error collection: <dbname>.users index: email_1 dup key: { email: \"${MOCK_USER.email}\" }` }, done);
	});
});
