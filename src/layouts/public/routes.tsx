import { Route } from '../../types';
import { Login } from '../../pages';

export const publicRoutes: Route[] = [
   {
      name: 'Login',
      path: '/',
      component: <Login />,
   },
];
