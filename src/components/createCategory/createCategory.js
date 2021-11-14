import React, {Component} from "react";
import axios from "axios";
import Select from 'react-select';

const initialState = {
    name: '',
    cost: 0,
    vehicles: [],
    options: [],
    selected: []
}

class CreateCategory extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.onVehicleSelect = this.onVehicleSelect.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:8090/vehicle').then(response => {
            console.log(response.data.data);
            this.setState({vehicles: response.data.data}, () => {
                let data = [];
                this.state.vehicles.map((item, index) => {
                    let vehicle = {
                        value: item._id,
                        label: item.code
                    }
                    data.push(vehicle);
                });
                this.setState({options: data});
            });
        });
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onVehicleSelect(e) {
        this.setState({selected: e ? e.map(item => item.value) : []});
    }

    onSubmit(e) {
        let category = {
            category: this.state.name,
            value: this.state.cost,
            vehicles: this.state.selected
        }
        console.log('DATA TO SEND', category);
        axios.post('http://localhost:8090/category/create', category).then(response => {
            alert('Category Added');
        }).catch(error => {
            alert(error.message);
        });
    }

    render() {
        return (
            <div className="container">
                <br/>
                <h1>Create Category</h1>
                <br/>
                <form onSubmit={this.onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Category Name</label>
                        <input type="text" className="form-control" onChange={this.onChange} name="name"
                               value={this.state.name}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="vehicles" className="form-label">Vehicles</label>
                        <Select
                            options={this.state.options}
                            onChange={this.onVehicleSelect}
                            isMulti
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cost" className="form-label">Category Cost</label>
                        <input type="Number" className="form-control" onChange={this.onChange} name="cost"
                               value={this.state.cost}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Add Category</button>
                </form>
            </div>
        )
    }
}

export default CreateCategory;