import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

let initialData = [
    {
        key: 0,
        value: "hello",
        checked: "false",
    },
    {
        key: 1,
        value: "world",
        checked: "false",
    },
    {
        key: 2,
        value: "nice",
        checked: "false",
    }

];

ReactDOM.render(
  <React.StrictMode>
    <App initialData = {initialData}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
