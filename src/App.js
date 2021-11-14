import './App.css';

//IMPORT BROWSERROUTER
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

//IMPORT
import NavBar from './components/navBar/navBar';
import Categories from './components/categories/categories';
import Vehicles from './components/vehicles/vehicles';
import CreateCategory from './components/createCategory/createCategory';
import CreateVehicle from './components/createVehicle/createVehicle';
import VehicleList from "./components/categories/vehicleList";
import SelectedTripCost from "./components/categories/selectedTripCost";

function App() {
  return (
    <div>
      <Router>
          <NavBar/>
          <section>
            <Switch>
              <Route path = "/" component={Categories} exact/>
              <Route path = "/create-vehicle" component={CreateVehicle} />
              <Route path = "/create-category" component={CreateCategory} />
              <Route path="/vehicle/:id" component={VehicleList} exact/>
              <Route path="/cost/:id/:cid" component={SelectedTripCost}/>
              <Route path="/view-vehicle" component={Vehicles}/>
            </Switch>
          </section>
      </Router>
    </div>
  );
}

export default App;
