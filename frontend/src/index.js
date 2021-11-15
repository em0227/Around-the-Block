import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import axios from 'axios'
import Root from "./components/root";
import configureStore from "./store/store";

document.addEventListener("DOMContentLoaded", () => {
  let store = configureStore();
  const root = document.getElementById("root");
  ReactDOM.render(<Root store={store} />, root);
});
