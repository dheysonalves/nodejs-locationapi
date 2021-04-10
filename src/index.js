require('./database/models/User');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth.routes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();
const PORT = 3000;

// For a procedural point of view, we must first bodyParser the data, then made the request.

app.use(authRoutes);

const mongoUri = 'mongodb+srv://dev_tracker:FlZrYpiY8IgV0OL5rUba@cluster0.i86av.mongodb.net/<dbname>?retryWrites=true&w=majority';

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
})

app.get('/', requireAuth,(request, response) => {
	const { email } = request.user;
	response.send(`Your email: ${email} `);
});

app.listen(PORT, () => {
	console.log(`Listening port in ${PORT}`)
})
