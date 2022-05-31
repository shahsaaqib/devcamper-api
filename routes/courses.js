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

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    advanceResults(Course, { path: 'bootcamp', select: 'name description' }),
    getCourses
  )
  .post(AddCourse);

router.route('/:id').get(getCourse).put(updateCourse).delete(deleteCourse);

module.exports = router;
