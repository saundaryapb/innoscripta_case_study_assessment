import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Route as RouteType } from '../../../types';
import Header from './Header';

interface LayoutProps {
   routes: RouteType[];
   data: any;
   handleChange: (action: { key: string }) => void;
}

const Layout: React.FC<LayoutProps> = ({ routes, data, handleChange }) => {
   return (
      <div>
         <Header data={data} handleChange={handleChange} />
         <Routes>
            {routes.map((route) => (
               <Route key={route.path} path={route.path} element={route.component} />
            ))}
            <Route path="/" element={<Navigate to="/board" replace />} />
            <Route path="*" element={<Navigate to="/board" replace />} />
         </Routes>
      </div>
   );
};

export default Layout;
