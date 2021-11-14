import React, {Component} from "react";
import axios from 'axios';
import Select from 'react-select';

const initialState = {
    category: '',
    vehicle: '',
    categories: [],
    optionsCategory: [],
    selectedCategory: [],
    optionsVehicles: [],
    selected: []
}

class TripCharges extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.onSubjectSelect = this.onSubjectSelect.bind(this)
    }

    componentDidMount() {
        axios.get('http://localhost:8090/category').then(response => {
            console.log(response.data.data);
            this.setState({categories: response.data.data}, () => {
                let data = [];
                this.state.categories.map((item, index)=>{
                    let category = {
                        value: item.category,
                        label: item.category
                    }
                    data.push(category);
                });
                this.setState({optionsCategory: data});
            });
        });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value})
    }

    onSubjectSelect(e) {
        this.setState({selectedCategory: e ? e.map(item => item.value) : []});
    }


    onSubmit(e) {
        let vehicle = {
            code: this.state.code,
            model: this.state.model,
            type: this.state.type,
            name: this.state.name,
            categories: this.state.categories
        }
        console.log('DATA TO SEND', vehicle);
    }

    render() {
        return (
            <div className="container">
                <h1>Create Vehicle</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="code" className="form-label">Category</label>
                        <Select
                            options={this.state.optionsCategory}
                            onChange={this.onChange}
                            className={"basic-select"}
                            isMulti
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="model" className="form-label">Vehicles</label>
                        <Select
                            options={this.state.optionsVehicles}
                            onChange={this.onChange}
                            className={"basic-select"}
                            isMulti
                        />

                    </div>
                </form>
                <h3>Trip Charge</h3>
            </div>
        )
    }
}

export default TripCharges;