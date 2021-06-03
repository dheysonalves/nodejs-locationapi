const express = require('express');
const authRoutes = require('./auth.routes');
const trackRoutes = require('./track.routes');

const routes = express();

// For a procedural point of view, we must first bodyParser the data, then made the request.
routes.use('/api/users', authRoutes);
routes.use('/api/tracks', trackRoutes);

module.exports = routes;
