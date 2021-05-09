require('dotenv').config();
require('../components/users/User');
require('../components/tracks/Track');
require('./config/database.config');
require('./routes/index.routes');

const express = require('express');

const trackRoutes = require('./routes/index.routes');
const authRoutes = require('./routes/auth.routes');

const requireAuth = require('./middlewares/requireAuth');

const app = express();
const PORT = process.env.PORT || 3000;

// For a procedural point of view, we must first bodyParser the data, then made the request.
app.use(authRoutes);
app.use(trackRoutes);

app.get('/', requireAuth,(request, response) => {
	const { email } = request.user;
	response.send(`Your email: ${email} `);
});

app.listen(PORT, () => {
	console.log(`Listening port in ${PORT}`)
});
