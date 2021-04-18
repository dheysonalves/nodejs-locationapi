const express = require('express');
const mongoose = require('mongoose');

const UserController = require("../controllers/UserController");

const router = express.Router();

router.post('/signup', UserController.signin);

router.post('/signin', UserController.signup);

module.exports = router;

