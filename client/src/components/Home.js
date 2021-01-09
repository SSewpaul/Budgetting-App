import { Component } from "react"
import NavigationBar from '../components/navigationBar.js';
import ItemList from '../components/ItemList';
import ItemModal from '../components/itemModal';
import {loadUser} from '../actions/authActions';
import store from '../store';


class Home extends Component{
    componentDidMount(){
        store.dispatch(loadUser());
    };

    render(){

        return (
            <div className="Home">
                <NavigationBar/>
                <ItemModal/>
                <ItemList/>
            </div>
        );
    };
};

export default Home;