//Controllers are used only for implementing functions and exporting
const Subject = require('../models/subject.model');

const createSubject = async (req, res) => {
    if (req.body) {
        const subject = new Subject(req.body);
        subject.save()
            .then(data => {
                res.status(200).send({data: data});
            })
            .catch(error => {
                res.status(500).send({error: error.message});
            });
    }
}

const getAllSubjects = async (req, res) => {
    await Subject.find({})
        .then(data => {
            res.status(200).send({data: data});
        })
        .catch(error => {
            res.status(500).send({error: error.message});
        });
}

const getSubjectsForCourse = async (req, res) => {
    if (req.params && req.params.id) {
        await Subject.find({'course._id': req.params.id})
            .then(response => {
                res.status(200).send({data: response});
            })
            .catch(error => {
                res.status(500).send({error: error.message});
            });
    }
}

module.exports = {
    createSubject,
    getAllSubjects,
    getSubjectsForCourse
};