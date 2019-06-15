const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateSignup(data) {
	let errors = {};

	data.email = !isEmpty(data.email) ? data.email: '';
	data.password = !isEmpty(data.password) ? data.password: '';
	data.password2 = !isEmpty(data.password2) ? data.password2: '';

	if (validator.isEmpty(data.email)) {
		errors.email = 'Email is required.';
	}

	if (!validator.isEmail(data.email)) {
		errors.email = 'Enter a valid email.';
	}

	if (!validator.isLength(data.password, {min: 6, max: 30})) {
		errors.password = 'Password should be atleast 6 characters.';
	}
	
	if (validator.isEmpty(data.password)) {
		errors.password = 'Password is required and be atleast 6 characters.';
	}


	if (validator.isEmpty(data.password2)) {
		errors.password2 = 'Confirm password is required.';
	}

	if (!validator.equals(data.password, data.password2)) {
		errors.password2 = 'Passwords must match.';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}

}