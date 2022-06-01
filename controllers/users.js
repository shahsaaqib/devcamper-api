const errorResponse = require('../utils/errorResponse');
const User = require('../models/User');
const asyncHandler = require('../middleware/async');

// @desc    Get all Users
// @route   GET /api/v1/users
// @access  Private/Admin

exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advanceResults);
});

// @desc    Get single Users
// @route   GET /api/v1/users/:id
// @access  Private/Admin

exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Create User
// @route   POST /api/v1/users
// @access  Private/Admin

exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({
    success: true,
    data: user,
  });
});

// @desc    Update User
// @route   PUT /api/v1/users/:id
// @access  Private/Admin

exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    success: true,
    data: user,
  });
});

// @desc    Delete User
// @route   DELETE /api/v1/users/:id
// @access  Private/Admin

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  res.status(201).json({
    success: true,
    data: {},
  });
});
