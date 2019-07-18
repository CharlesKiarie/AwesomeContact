const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEmail(data) {
	let errors = {};

	data.email = !isEmpty(data.email) ? data.email: '';

	if (!validator.isEmail(data.email)) {
		errors.email = 'Enter a valid email.';
	}

	if (validator.isEmpty(data.email)) {
		errors.email = 'Email is required.';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}
}