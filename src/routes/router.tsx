import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import EventDetails from '../pages/EventDetails';
import BookEvent from '../pages/BookEvent';
import CreateEvent from '../pages/CreateEvent';

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
      {
        path: '/event-details/:id',
        element: <EventDetails />,
      },
      {
        path: '/book-event/:id',
        element: <BookEvent />,
      },
      {
        path: '/create-event',
        element: <CreateEvent />,
      },
    ],
  },
]);
