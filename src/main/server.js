require('dotenv').config();
require('../components/users/User');
require('../components/tracks/Track');
require('./config/database.config');

const requireAuth = require('./middlewares/requireAuth');

const app = require('./app');

const PORT = process.env.PORT || 3000;

app.get('/', requireAuth, (request, response) => {
	const { email } = request.user;
	response.send(`Your email: ${email} `);
});

app.listen(PORT, () => {
	console.log(`Server started on port ${process.env.SERVER_PORT}`);
});
