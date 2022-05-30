const express = require('express');
const { getCourses, getCourse, AddCourse } = require('../controllers/courses');

const router = express.Router({ mergeParams: true });

router.route('/').get(getCourses).post(AddCourse);
router.route('/:id').get(getCourse);

module.exports = router;
