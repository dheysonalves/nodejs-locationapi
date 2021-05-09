const mongoose = require('mongoose');
const express = require('express');

const requireAuth = require('../middlewares/requireAuth');
const TrackController = require("../../components/tracks/TrackController");

const router = express.Router();

router.use(requireAuth);

router.get('/tracks', TrackController.index);

router.post('/tracks', TrackController.store);

module.exports = router;
