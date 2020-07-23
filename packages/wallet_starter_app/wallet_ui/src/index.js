import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import WalletComponent from './WalletComponent';
// var Buffer = require('buffer/').Buffer
// window.Buffer = Buffer


ReactDOM.render(
  <React.StrictMode>
    <WalletComponent />
  </React.StrictMode>,
  document.getElementById('root')
);
