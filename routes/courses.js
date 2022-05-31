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
const { protect } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    advanceResults(Course, { path: 'bootcamp', select: 'name description' }),
    getCourses
  )
  .post(protect, AddCourse);

router
  .route('/:id')
  .get(getCourse)
  .put(protect, updateCourse)
  .delete(protect, deleteCourse);

module.exports = router;
