import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import HomePage from './routes/HomePage.jsx';
import CreatePage from './routes/CreatePage.jsx';
import EditPage from './routes/EditPage.jsx';
import GalleryPage from './routes/GalleryPage.jsx';
import DetailPage from './routes/DetailPage.jsx';

let router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "/create",
        element: <CreatePage />
      },
      {
        path: "/edit/:id",
        element: <EditPage />
      },
      {
        path: "/gallery",
        element: <GalleryPage />
      },
      {
        path: "/:id",
        element: <DetailPage />
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
