import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import Home from '../pages/Home';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      // { path: 'attend', element: <AttendEvent /> },
      // { path: 'create', element: <CreateEvent /> },
      // { path: 'contact', element: <Contact /> },
      // { path: 'about', element: <About /> },
    ],
  },
]);
