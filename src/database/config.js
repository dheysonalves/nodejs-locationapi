const mongoose = require('mongoose');

const mongoUri = `mongodb+srv://dev_tracker:${process.env.DEV_TRACKER}`;

mongoose.connect(mongoUri, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
	console.log('Connected to mongo instance');
});

mongoose.connection.on('error', (err) => {
	console.error('Error connecting to mongo', err);
});
