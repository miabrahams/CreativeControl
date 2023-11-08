import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';

/* import styles from './sass/app.scss'; */
import styles from './sass/router_demo.css';

console.log('Booting!')


const domRoot = document.getElementById('root');
const root = createRoot(domRoot);
root.render(<App />);
