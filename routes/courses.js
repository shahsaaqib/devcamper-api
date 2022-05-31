const express = require('express');
const {
  getCourses,
  getCourse,
  AddCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/courses');

const advanceResults = require('../middleware/advanceResults');
const Course = require('../models/Course');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    advanceResults(Course, { path: 'bootcamp', select: 'name description' }),
    getCourses
  )
  .post(protect, authorize('publisher', 'admin'), AddCourse);

router
  .route('/:id')
  .get(getCourse)
  .put(protect, authorize('publisher', 'admin'), updateCourse)
  .delete(protect, authorize('publisher', 'admin'), deleteCourse);

module.exports = router;
