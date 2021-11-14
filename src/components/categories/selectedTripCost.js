//IMPORT REACT
import React, { Component } from 'react';

//IMPORT AXIOS
import axios from 'axios';

const initialState = {
    selectedCategory: [],
    selectedVehicle: [],
    duration: 1,
    cost: null
}

class SelectedTripCost extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this)
    }

    componentDidMount() {
        console.log('V ID:', this.props.match.params.id);
        console.log('C ID:', this.props.match.params.cid);
        axios.get(`http://localhost:8090/vehicle/${this.props.match.params.id}`).then(response => {
            this.setState({selectedVehicle: response.data.data});
        });

        axios.get(`http://localhost:8090/category/v2/${this.props.match.params.cid}`).then(response => {
            console.log(response.data.data.category);
            this.setState({selectedCategory: response.data.data});
        });
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();
        let data = {
            categoryValue: this.state.selectedCategory.value,
            vehicleValue: this.state.selectedVehicle.value,
            duration: this.state.duration
        }

        axios.post('http://localhost:8090/category/calculate', data).then(response => {
            console.log('COST RESPONSE', response.data.data);
            this.setState({cost: response.data.data});
            console.log('COST', this.state.cost);
        })
    }

    displayCost() {
        if (this.state.cost == null) {
            return 0;
        } else {
            return this.state.cost;
        }
    }

    render() {
        return (
            <div className="container">
                <br/>
                <h2>You have selected: {this.state.selectedCategory.category}</h2>
                <h4>Vehicle:<br/>&nbsp;&nbsp;{this.state.selectedVehicle.code}<br/>&nbsp;&nbsp;{this.state.selectedVehicle.model} {this.state.selectedVehicle.name}
                </h4>
                <br/>
                <p>Insert the amount of hours you wish to have,</p>
                <form onSubmit={this.onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="code" className="form-label">Duration in hours</label>
                        <input type="Number" className="form-control" name="duration" value={this.state.duration}
                               onChange={this.onChange}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Calculate Cost</button>
                </form>
                <br/>
                <h3>Trip charge costs: LKR {this.displayCost()}</h3>
            </div>
        )
    }
}

export default SelectedTripCost;