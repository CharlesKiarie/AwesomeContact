const express = require('express');
const path = require('path');
const isAuth = require('../middleware/is-auth');

const router = express.Router();
const indexController = require('../controllers/index');
const mailController = require('../controllers/mailTest');
const authController = require('../controllers/auth');
const dashboardController = require('../controllers/dashboard');


router.get('/', indexController.getIndex);
router.get('/index', indexController.getIndex);
router.get('/success', indexController.getSuccess);
router.get('/error', indexController.getError);
router.get('/billing', indexController.getBilling);
router.get('/contact', indexController.getContact);
router.get('/thankyou', indexController.getThankYou)
router.post('/api/v1/:id/:email', mailController.postEmail);

router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/dashboard', isAuth, dashboardController.getDashboard);
router.post('/add', isAuth, dashboardController.pushEmailValues);
router.get('/add', isAuth, dashboardController.getDashboard);
router.post('/delete', isAuth, dashboardController.pullEmailValues);
router.get('/delete', isAuth, dashboardController.getDashboard);



module.exports = router;