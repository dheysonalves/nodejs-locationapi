require('dotenv').config();

const app = require('./app');

app.listen(process.env.SERVER_PORT, () => {
	console.log(`Server started on port ${process.env.SERVER_PORT}`);
});
