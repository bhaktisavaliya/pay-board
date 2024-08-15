import React from 'react';
import ReactDOM from 'react-dom/client';
import {Toaster} from "react-hot-toast";
import './index.css';
import App from './App';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <App />
    <Toaster/>
    <Footer />
  </React.StrictMode>
);
