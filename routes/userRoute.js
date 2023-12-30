const express = require('express');
const userControllers = require('../controllers/userController');
const authenticationContr = require('../controllers/authenticationContr')

const router = express.Router();

router.post('/signup', authenticationContr.signUp);
router.post('/logIn', authenticationContr.logIn);
router.post('/logout', authenticationContr.logOut);
router.get('/profile', authenticationContr.protect, userControllers.getUser)



router.route('/').get(authenticationContr.protect, userControllers.getAllUsers);
router.route('/:id').delete(userControllers.deleteUser).patch(authenticationContr.protect, userControllers.updateUser);

module.exports = router