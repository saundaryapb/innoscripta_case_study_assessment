import { ROUTE_COLLECTION } from '../../shared/constants';
import { Route } from '../../types';
import { Board, Issue } from '../../pages';

export const privateRoutes: Route[] = [
   {
      name: 'Board',
      path: ROUTE_COLLECTION.BOARD,
      component: <Board />,
   },
   {
      name: 'Issue Detail',
      path: ROUTE_COLLECTION.ISSUE_DETAIL,
      component: <Issue />,
   },
];
