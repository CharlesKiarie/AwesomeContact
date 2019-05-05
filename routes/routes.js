const express = require('express');
const path = require('path');

const router = express.Router();
const indexController = require('../controllers/index');
const mailController = require('../controllers/mailTest');
const authController = require('../controllers/auth');
const dashboardController = require('../controllers/dashboard');


router.get('/', indexController.getIndex);
router.post('/contact', mailController.postEmail);

router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/dashboard', dashboardController.getDashboard);


module.exports = router;