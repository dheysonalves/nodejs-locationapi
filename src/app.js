require('dotenv').config();
require('./database/models/User');
require('./database/models/Track');
require('./database/config');

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const routes = require('./routes/index.routes.js');

class App {
	constructor() {
		this.server = express();

		this.middlewares();
		this.routes();
	}

	middlewares() {
		this.server.use(helmet());
		this.server.use(cors());
		this.server.use(express.json());
	}

	routes() {
		this.server.use(routes);
	}

}

module.exports = new App().server;
