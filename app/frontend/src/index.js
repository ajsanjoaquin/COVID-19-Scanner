import ReactDOM from 'react-dom'
import React from 'react'

import App from './components/App';

import './tailwind.generated.css';

import {Provider} from 'react-redux';
import  {createStore, applyMiddleware} from "redux";


import thunk from 'redux-thunk';
import reducers from './reducers';


ReactDOM.render(
  <Provider store = {createStore(reducers,applyMiddleware(thunk))}>
    <App />
  </Provider>
  ,
  document.getElementById('root')
);

