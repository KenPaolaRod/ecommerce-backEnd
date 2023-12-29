const express = require('express');
const userControllers = require('../controllers/userController');
const authenticationContr = require('../controllers/authenticationContr')

const router = express.Router();

// router.post('/signup', authenticationContr.signUp)
router.post('/signup', authenticationContr.signUp);
router.post('/logIn', authenticationContr.logIn);


router.route('/').get(userControllers.getAllUsers);
router.route('/:id').patch(userControllers.updateUser).get(userControllers.getUser).delete(userControllers.deleteUser);

module.exports = router