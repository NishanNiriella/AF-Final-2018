const mongoose = require('mongoose');

//model properties
const CourseSchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    code: {type: String, required: true, trim: true},
    passMark: {type: Number, required: true},
    lecturer: {type: String, required: true, trim: true},
    subjects: [{type: mongoose.Schema.Types.ObjectId, required: false, ref: 'subjects'}] //many to many relationship
});

const Course = mongoose.model('courses', CourseSchema);

module.exports = Course;