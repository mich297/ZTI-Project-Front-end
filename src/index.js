import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, withRouter} from "react-router-dom";
import './index.css';
import StartComponent from './components/StartComponent.js';
import Login from './components/Login.js';
import Main from './components/Main.js';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
      <StartComponent/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
