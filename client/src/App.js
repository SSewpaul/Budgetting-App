import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/navigationBar.js';
import ItemList from './components/ItemList';
import {Provider, provider} from 'react-redux';
import ItemModal from './components/itemModal';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <NavigationBar/>
        <ItemModal/>
        <ItemList/>
      </div>
    </Provider>
  );
}

export default App;
