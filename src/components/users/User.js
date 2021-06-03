const mongoose = require('mongoose');
const bycrpt = require('bcrypt');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
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

userSchema.methods.comparePassword = function (candidatePassword) {
	const user = this;

	return new Promise((resolve, reject) => {
		bycrpt.compare(candidatePassword, user.password, (err, isMatch) => {
			if (err) {
				return reject(err);
			}

			if (!isMatch) {
				return reject(false);
			}

			resolve(true);
		});
	});


	// Another way to be done
	// bycrpt.compare(candidatePassword, user.password).then((result) => {
	// 	try {
	// 		if (result == true) {
	// 			return next();
	// 		}
	// 	} catch (error) {
	// 		return error;
	// 	}
	// });
};

mongoose.model('User', userSchema);
