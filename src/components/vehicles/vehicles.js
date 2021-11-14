//IMPORT REACT
import React, { Component } from 'react';
import axios from 'axios';

//import Swal from 'sweetalert2';

//CLASS COMPONENT
class Vehicles extends Component {
    constructor(props) {
        super(props);
        this.deleteVehicle = this.deleteVehicle.bind(this);
        this.state = {
            vehicles: []
            }
    }


    componentDidMount() {
        axios.get('http://localhost:8090/vehicle').then(response => {
            console.log(response.data.data);
            this.setState({vehicles: response.data.data});
        })
    }

    deleteVehicle(e, vehicleId) {
        axios.delete(`http://localhost:8090/vehicle/d2/${vehicleId}`).then(response => {
            console.log(response.data.data);
            alert('deleted');
            window.location.reload();
        })
    }


//RETURN
render() {
    return (
        <div className="container">
            <br/>
                <h1>Vehicles</h1>
                <br/>
                {this.state.vehicles.length > 0 && this.state.vehicles.map((item, index)=>
                    <div key={index} className="card mb-3">
                        <div className="p-3">
                            <h5>Code : {item.code}</h5>
                            <h5>Model : {item.model}</h5>
                            <h5>Type : {item.type}</h5>
                            <h5>Name: {item.name}</h5>

                            <button type="button" className="btn btn-warning" onClick={this.updateVehicle}> Update </button> {' '}
                            <button onClick={e => this.deleteVehicle(e, item._id)} className="btn btn-danger">Delete</button> {' '}
                        </div>
                        
                    </div>
                )}
            </div>
    )
  }
}

//EXPORT
export default Vehicles;