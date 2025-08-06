import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Route as RouteType } from '../../../types';
import { layoutStyles } from './styles';

interface LayoutProps {
   routes: RouteType[];
}

const Layout: React.FC<LayoutProps> = ({ routes }) => {
   return (
      <div style={layoutStyles.container}>
         <div style={layoutStyles.content}>
            <Routes>
               {routes.map((route) => (
                  <Route key={route.path} path={route.path} element={route.component} />
               ))}
            </Routes>
         </div>
      </div>
   );
};

export default Layout;
