import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import CatalogView from './components/Catalog/CatalogView';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <CatalogView />
      </div>
    </Provider>
  );
}

export default App;