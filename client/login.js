import React from 'react';
import { createRoot } from 'react-dom/client';

console.log('Login!')



import './sass/login.scss';
import LoginPage from './components/LoginPage';



createRoot(document.getElementById('root')).render(<LoginPage />);