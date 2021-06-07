import React, {Component} from 'react';
import axios from "axios";
import Select from 'react-select';

const initialState = {
    courseName: '',
    code: '',
    passMark: 0,
    lecturer: '',
    subjects: [],
    options: [],
    selectedSubjects: []
}

class CreateCourse extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubjectSelect = this.onSubjectSelect.bind(this);
        this.state = initialState;
    }

    componentDidMount() {
        axios.get("http://localhost:8087/subject").then(response => {
            this.setState({subjects: response.data.data}, () => {
                let data = [];
                this.state.subjects.map((item, index) => {
                    let subject = {
                        value: item._id,
                        label: item.name
                    }
                    data.push(subject);
                });
                this.setState({options: data})
            });
        })
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubjectSelect(e) {
        this.setState({selectedSubjects: e ? e.map(item => item.value) : []});
    }

    onSubmit(e) {
        e.preventDefault();
        let course = {
            name: this.state.courseName,
            code: this.state.code,
            passMark: this.state.passMark,
            lecturer: this.state.lecturer,
            subjects: this.state.selectedSubjects
        }
        console.log('DATA TO SEND', course);
        axios.post("http://localhost:8087/course/create", course).then(response => {
            alert('Data Successfully inserted');
        }).catch(error => {
            console.log(error.message);
            alert(error.message);
        });
    }

    render() {
        return (
            <div className="container">
                <h1>Create Course</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="courseName" className="form-label">Course Name</label>
                        <input type="text" className="form-control" name="courseName"
                               value={this.state.courseName} onChange={this.onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="code" className="form-label">Code</label>
                        <input type="text" className="form-control" name="code"
                               value={this.state.code} onChange={this.onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="passMark" className="form-label">Pass Mark</label>
                        <input type="number" className="form-control" name="passMark"
                               value={this.state.passMark} onChange={this.onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lecturer" className="form-label">Lecturer</label>
                        <input type="text" className="form-control" name="lecturer"
                               value={this.state.lecturer} onChange={this.onChange}/>
                    </div>
                    <Select
                        options={this.state.options}
                        onChange={this.onSubjectSelect}
                        className="basic-multi-select"
                        isMulti
                    />
                    <br/>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default CreateCourse;
