import React from 'react';
import ReactDOM from 'react-dom/client';
import './static/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

import { registerLicense } from '@syncfusion/ej2-base';

const root = ReactDOM.createRoot(document.getElementById('root'));

registerLicense('Ngo9BigBOggjHTQxAR8/V1NAaF5cWWJCf0x0TXxbf1x0ZFdMYFRbRX9PIiBoS35RdURhW3ZfdHRdR2lUV012');
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
