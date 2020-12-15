import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/navigationBar.js';
import ItemList from './components/ItemList';
import {Provider, provider} from 'react-redux';
import store from './store'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <NavigationBar/>
        <ItemList/>
      </div>
    </Provider>
  );
}

export default App;
