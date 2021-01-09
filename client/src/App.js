import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux';
import store from './store';
import { Component } from 'react';
import RegistrationPage from "./components/RegisterPage";
import {Router, Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import history from './history';
import LoginPage from './components/LoginPage';

class App extends Component {

  render(){

    return (
      <Provider store={store}>
        <Router history={history}>
          <div className="App">
            <Switch>
              <Route path='/' exact component={Home}/>
              <Route path='/Register' component={RegistrationPage}/>
              <Route path='/Login' component={LoginPage}/>
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}



export default App;
