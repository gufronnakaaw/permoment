import { createBrowserRouter } from 'react-router-dom';

// components
import Dashboard from '../components/Dashboard';
import Month from '../components/Month';
import ErrorPage from '../components/ErrorPage';
import UpdateItem from '../components/UpdateItem';

export default createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/month/:name',
    element: <Month />,
  },
  {
    path: '/update/:name/item/:id',
    element: <UpdateItem />,
  },
]);
