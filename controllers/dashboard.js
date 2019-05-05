exports.getDashboard = (req, res) => {
	res.render('dashboard', {
		isAuthenticated: req.session.isAuthenticated
	});
};