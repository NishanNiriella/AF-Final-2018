const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controller');

module.exports= () => {
    router.post('/create', courseController.createCourse);
    router.get('/',courseController.getAllCourses);
    router.get('/:id', courseController.getSubjectsForCourse);
    router.get('/amount/:id', courseController.calculateAmount);
    return router;
}