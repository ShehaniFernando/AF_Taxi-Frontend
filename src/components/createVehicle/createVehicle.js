//IMPORT REACT
import React, { Component } from 'react';

import axios from 'axios';
import Select from 'react-select';


const initialState = {
    code: '',
    model: '',
    type: '',
    name: '',
    value: 0,
    categories: [],
    options: [],
    selectedCategories: []
}

//CLASS COMPONENT
class CreateVehicle extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCategorySelect = this.onCategorySelect.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:8090/category').then(response => {
            console.log(response.data.data);
            this.setState({categories: response.data.data}, () => {
                let data = [];
                this.state.categories.map((item, index) => {
                    let category = {
                        value: item._id,
                        label: item.category
                    }
                    data.push(category);
                });
                this.setState({options: data});
            });
        })
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value})
    }


    onCategorySelect(e) {
        this.setState({selected: e ? e.map(item => item.value) : []});
    }

onSubmit(e){
        e.preventDefault();
        let vehicle = {
            code: this.state.code,
            model: this.state.model,
            type: this.state.type,
            name: this.state.name,
            value: this.state.value,
            categories: this.state.selectedCategories
        }
        console.log('DATA TO SEND', vehicle )
        axios.post('http://localhost:8090/vehicle/create', vehicle)
        .then(response => {
            alert('Data Successfully inserted')
        })
        .catch(error => {
            console.log(error.message);
            alert(error.message)
        })
    }

//RETURN
render() {
    return (
        <div className='container'>
        <h1> Add New Vehicle </h1>
        <form onSubmit = {this.onSubmit}>
            <div className="mb-3">
                <label htmlFor="code" className="form-label"> Vehicle Code </label>
                <input 
                type="text" 
                className="form-control" 
                id="code" 
                name="code" 
                value={this.state.code} 
                onChange={this.onChange}
                />
            </div>

            <div class="mb-3">
                <label htmlFor="model" className="form-label"> Vehicle Model </label>
                <input 
                type="text" 
                className="form-control" 
                id="model" 
                name="model" 
                value={this.state.model} 
                onChange={this.onChange}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="type" className="form-label"> Vehicle Type </label>
                <input type="text" 
                className="form-control" 
                id="type" 
                name="type" 
                value={this.state.type} 
                onChange={this.onChange}
                />
            </div>

            <div className="mb-3">
            <label htmlFor="name" className="form-label"> Vehicle Name </label>
                <input 
                type="text" 
                className="form-control" 
                id="name" 
                name="name" 
                value={this.state.name} 
                onChange={this.onChange}
                />
            </div>

            <div className="mb-3">
            <label htmlFor="value" className="form-label"> Vehicle Value Per Hour </label>
                <input 
                type="Number" 
                className="form-control" 
                id="value" 
                name="value" 
                value={this.state.value} 
                onChange={this.onChange}
                />
            </div>

            <div className="mb-3">
            <label htmlFor="category" className="form-label"> Vehicle Category </label>
            <Select
                            options={this.state.options}
                            onChange={this.onCategorySelect}
                            className={"basic-multi-select"}
                            isMulti
            />
            </div>

            <button type="submit" className="btn btn-primary"> ADD Vehicle </button>
        </form>
    </div>
    )
  }
}

//EXPORT
export default CreateVehicle;