const express = require('express');
const authRoutes = require('./auth.routes');
const trackRoutes = require('./track.routes');
const requireAuth = require('../middlewares/requireAuth');

const routes = express.Router();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', requireAuth, (request, response) => {
	const { email } = request.user;
	response.send(`Your email: ${email} `);
});

// For a procedural point of view, we must first bodyParser the data, then made the request.
app.use(authRoutes);
app.use(trackRoutes);


module.exports = routes;
