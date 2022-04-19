const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {
	getUsers,
	viewUser,
	createUser,
	updateUser,
	deleteUser,
	deleteUsers,
} = require('../controllers/user');
const { validateUser } = require('../middleware/validations');
const { authenticate } = require('../middleware/authMiddleware');

// @desc Get Users
// @route GET /api/user
// @access private
router.route('/').get(authenticate, catchAsync(getUsers));

// @desc Create User
// @route POST /api/user
// @access private
router.route('/').post(authenticate, validateUser, catchAsync(createUser));

// @desc Delete All Users
// @route DELETE /api/user
// @access private
router.route('/').delete(authenticate, catchAsync(deleteUsers));

// @desc Get User by ID
// @route GET /api/user/:id
// @access private
router.route('/:id').get(authenticate, catchAsync(viewUser));

// @desc Update User by ID
// @route PUT /api/user/:id
// @access private
router.route('/:id').put(authenticate, validateUser, catchAsync(updateUser));

// @desc Delete User by ID
// @route DELETE /api/user/:id
// @access private
router.route('/:id').delete(authenticate, catchAsync(deleteUser));

module.exports = router;
