//Where the entry points are built
//Importing dependencies
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser'); //to handle json data at the request
const subjectAPI = require('./src/api/subject.api');
const courseAPI = require('./src/api/course.api');

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 8087;
const MONGODB_URI = process.env.MONGODB_URI;

//Making the database connection
mongoose.connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (error) => {
    if (error) {
        console.log('Database Error: ', error.message);
    }
});

//Opening the connection
mongoose.connection.once('open', () => {
    console.log('Database Synced');
});

//root route(get request)
app.route('/').get((req, res) => {
    res.send('AF FINAL PAPER 2018');
});

//registering the path
app.use('/subject', subjectAPI());
app.use('/course', courseAPI());


//running on the port
app.listen(PORT, () => {
    console.log(`Server is up and running on PORT ${PORT}`);
})


