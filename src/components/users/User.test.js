const request = require('supertest');
let server = require('../../main/server');

const MOCK_USER = {
	name: 'John Walker',
	email: `jonny_walker${Math.random()}@gmail.com`,
	password: 'asd21324123'
};

describe('User Service', () => {

	describe('User Signup POST', () => {
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

		it('should return status 422 with the request with no password', function (done) {
			request(server)
				.post('/api/users/signup')
				.send({ name: MOCK_USER.name, email: MOCK_USER.email })
				.set('Accept', 'application/json')
				.expect(422, {
					"error": "It already exist an user with this email",
					"message": "User validation failed: password: Path `password` is required."
				}, done);
		});

		it('should return status 422 with the request with no email and password', function (done) {
			request(server)
				.post('/api/users/signup')
				.send({ name: MOCK_USER.name })
				.set('Accept', 'application/json')
				.expect(422, {
					"error": "It already exist an user with this email",
					"message": "User validation failed: email: Path `email` is required., password: Path `password` is required."
				}, done);
		});

		it('should return status 422 with the request with no email, password and name', function (done) {
			request(server)
				.post('/api/users/signup')
				.send({})
				.set('Accept', 'application/json')
				.expect(422, {
					"error": "It already exist an user with this email",
					"message": "User validation failed: name: Path `name` is required., email: Path `email` is required., password: Path `password` is required."
				}, done);
		});
	});

	describe('User Signin POST', () => {

	});

});



