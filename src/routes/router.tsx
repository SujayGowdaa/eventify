import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/sign-up',
        element: <SignUp />,
      },
      // { path: 'attend', element: <AttendEvent /> },
      // { path: 'create', element: <CreateEvent /> },
      // { path: 'contact', element: <Contact /> },
      // { path: 'about', element: <About /> },
    ],
  },
]);
