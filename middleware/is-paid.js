module.exports = (req, res, next) => {
	if(!req.session.isPaid) {
		return res.redirect('/billing');
	}
	next();
}