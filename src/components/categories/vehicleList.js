//IMPORT REACT
import React, { Component } from 'react';

//IMPORT AXIOS
import axios from 'axios'

class VehicleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trip: '',
            categoryId: '',
            vehicles: []
        }
    }

    componentDidMount() {
        console.log('Cat ID: ', this.props.match.params.id);
        axios.get(`http://localhost:8090/category/${this.props.match.params.id}`).then(response => {
            console.log('Vehicles: ', response.data.data);
            this.setState({vehicles: response.data.vehicles});
            this.setState({trip: response.data.vehicles.category, categoryId: this.props.match.params.id});
            console.log('Count:', this.state.vehicles.length>0);
        })
    }


    navigateVehiclePage(e, vehicleId){
        window.location = `/cost/${vehicleId}/${this.state.categoryId}`
    }

    render() {
        return (
            <div className="container">
                <br/>
                <h1>Vehicle List:- {this.state.trip}</h1>
                <br/>
                {this.state.vehicles.length > 0 && this.state.vehicles.map((item, index)=>
                    <div key={index} className="card mb-3">
                        <div className="p-3" onClick={e => this.navigateVehiclePage(e, item._id)}>
                            <h5>Code : {item.code}</h5>
                            <h5>Model : {item.model}</h5>
                            <h5>Type : {item.type}</h5>
                            <h5>Name: {item.name}</h5>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default VehicleList;