import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Bars from './components/Bars'
import Columns from './components/Columns';
import Donuts from './components/Donuts';
import Lines from './components/Lines';
import Pies from './components/Pies'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Bars />
    <Columns />
    <Donuts />
    <Lines />
    <Pies />
  </React.StrictMode>,
 document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
