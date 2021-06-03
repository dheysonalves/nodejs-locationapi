const express = require('express');
const mongoose = require('mongoose');

const UserController = require("../../components/users/UserController");

const router = express.Router();

router.post('/signin', UserController.signin);

router.post('/signup', UserController.signup);

module.exports = router;

