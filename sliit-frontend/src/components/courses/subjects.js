import React, {Component} from 'react';
import axios from 'axios';

class Subjects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subjects: [],
            totalAmount: 0
        }
    }

    componentDidMount() {
        console.log('COURSE ID', this.props.match.params.id);
        axios.get(`http://localhost:8087/course/${this.props.match.params.id}`)
            .then(response => {
                this.setState({subjects: response.data.subjects});
                console.log(response.data);
            })
            .catch(error => {
                alert(error.message);
            })

        axios.get(`http://localhost:8087/course/amount/${this.props.match.params.id}`)
            .then(response=>{
                console.log(response.data.totalAmount);
                this.setState({totalAmount: response.data.totalAmount})
            })
    }

    render() {
        return (
            <div className="container">
                <h1>Course Subjects</h1>
                <h3>Total Amount: {this.state.totalAmount}</h3>
                {this.state.subjects.length > 0 && this.state.subjects.map((item, index) => (
                    <div key={index} className="card mb-3">
                        <div className="p-3">
                            <h4>Subject Name : {item.name}</h4>
                            <h4>Description : {item.description}</h4>
                            <h4>Amount : {item.amount}</h4>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default Subjects;