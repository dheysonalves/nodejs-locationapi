require('dotenv').config();
require('./database/models/User');
require('./database/models/Track');
require('./database/config');
require('./routes/index.routes');

const express = require('express');

const trackRoutes = require('./routes/index.routes');

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
