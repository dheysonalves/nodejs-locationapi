const mongoose = require('mongoose');
const bycrpt = require('bcrypt');

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});

// model mongoose hooks
userSchema.pre('save', function (next) {
	const user = this;

	if (!user.isModified('password')) {
		return next();
	}

	bycrpt.genSalt(10, (err, salt) => {

		if (err) {
			return next(err);
		}

		bycrpt.hash(user.password, salt, (err, hash) => {
			if (err) {
				return next(err);
			}

			user.password = hash;
			next();
		});
	});

});

mongoose.model('User', userSchema);
