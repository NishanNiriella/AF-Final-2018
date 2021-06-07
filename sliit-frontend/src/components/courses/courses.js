import React, {Component} from 'react';
import axios from 'axios';

class Courses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8087/course').then(response => {
            console.log('Courses:', response.data);
            this.setState({courses: response.data.data});
        })
    }

    navigateSubjectPage(e, courseId) {
        window.location = `/${courseId}`
    }

    render() {
        return (
            <div className="container">
                <h1>Courses</h1>
                {this.state.courses.length > 0 && this.state.courses.map((item, index) =>
                    <div key={index} className="card mb-3">
                        <div className="p-3" onClick={e => this.navigateSubjectPage(e, item._id)}>
                            <h5>Course Name : {item.name}</h5>
                            <h5>Course code : {item.code}</h5>
                            <h5>Lecturer : {item.lecturer}</h5>
                            <h5>Pass Mark : {item.passMark}</h5>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default Courses;