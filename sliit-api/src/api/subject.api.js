const express = require('express');
const router = express.Router(); //to create endpoints using Router interface
const subjectController = require('../controllers/subject.controller');

module.exports = () => {
    router.post('/create', subjectController.createSubject);
    router.get('/', subjectController.getAllSubjects);
    router.get('/:id',subjectController.getSubjectsForCourse);
    return router;
}
