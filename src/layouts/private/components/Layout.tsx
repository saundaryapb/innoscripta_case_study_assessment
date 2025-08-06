import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Route as RouteType } from '../../../types';

interface LayoutProps {
   routes: RouteType[];
}

const Layout: React.FC<LayoutProps> = ({ routes }) => {
   return (
      <div>
         <Routes>
            {routes.map((route) => (
               <Route key={route.path} path={route.path} element={route.component} />
            ))}
         </Routes>
      </div>
   );
};

export default Layout;
