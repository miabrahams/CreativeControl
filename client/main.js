import React from 'react';
import { createRoot } from 'react-dom/client';

console.log('Booting!')



import 'reactjs-popup/dist/index.css';
// import styles from './sass/app.scss';
import styles from './sass/router_demo.scss';

import App, { loader as appLoader, createProjectAction } from './routes/App';
import ErrorPage from './routes/ErrorPage'
import Project, { projectLoader, updateAction } from './routes/Project'
import EditProject from './routes/EditProject';
import EditAsset, { editAction, deleteAction } from './routes/EditAsset';
import Index from './routes/Index';

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    loader: appLoader,
    action: createProjectAction,
    children: [
      {
        // Add error element for all children
        errorElement: <ErrorPage />,
        children: [
          {
            // Index element serves as base path
            index: true,
            element: <Index />
          },
          {
            path: "projects/:projectId/editAsset/:assetId",
            element: <EditAsset />,
            loader: projectLoader,
            action: editAction,
          },
          {
            path: "projects/:projectId/destroyAsset/:assetId",
            errorElement: <div>Oops! There was an error.</div>,
            action: deleteAction,
          },
          {
            exact : true,
            path: "projects/:projectId",
            element: <Project />,
            loader: projectLoader,
            action: updateAction,
          },
          // {
          //   path: "projects/:projectId/updateAsset/:assetId",
          //   errorElement: <div>Oops! There was an error.</div>,
          //   action: console.log,
          // }
        ]
      }
    ]
  },
])

/*
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route
} from "react-router-dom";

const router = (
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={<App />}
        loader={appLoader}
        action={createAction}
        errorElement={<ErrorPage />}
      >
        <Route errorElement={<ErrorPage />}>
          <Route index element={<Index />} />
          <Route
            path="projects/:projectId"
            element={<Project />}
            loader={projectLoader}
            action={updateAction}
          />
          <Route
            path="projects/:projectId/edit"
            element={<EditProject />}
            loader={projectLoader}
            action={editAction}
          />
          <Route
            path="projects/:projectId/destroy"
            action={deleteAction}
          />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
*/

createRoot(document.getElementById('root')).render(
  (
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
));