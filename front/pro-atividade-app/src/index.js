import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import "bootswatch/dist/slate/bootstrap.min.css";
import Menu from './components/Menu';
import { BrowserRouter as Router } from 'react-router-dom/cjs/react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Menu />
    <div className='container'>
      <App />
    </div>
  </Router>
);

