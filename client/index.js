import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import {createBrowserRouter, RouterProvider} from "react-router-dom";

console.log('Booting!')


// import styles from './sass/app.scss';
import styles from './sass/router_demo.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Hello World!</div>,
  },
])


const domRoot = document.getElementById('root');
const root = createRoot(domRoot);
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);