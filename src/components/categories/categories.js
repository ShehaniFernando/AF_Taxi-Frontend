//IMPORT REACT
import React, { Component } from 'react';

//IMPORT AXIOS
import axios from 'axios';

//CLASS COMPONENT
class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8090/category')
        .then(response => {
            console.log('Categories: ', response.data.data);
            this.setState({categories: response.data.data});
        })
    }

    navigateVehiclePage(e, categoryId){
        window.location = `/vehicle/${categoryId}`
    }

//RETURN
render() {
    return (
        <div className="container">
            <br/>
                <h1>Categories</h1>
                <br/>
                {this.state.categories.length > 0 && this.state.categories.map((item, index)=>
                    <div key={index} className="card mb-3">
                        <div className="p-3" onClick={e => this.navigateVehiclePage(e, item._id)}>
                            <h4> Category Name: {item.category}</h4>
                        </div>
                    </div>
                )}
            </div>
    )
  }
}

//EXPORT
export default Categories;