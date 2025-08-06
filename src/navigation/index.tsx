import React, { FC, useState } from 'react';
import { PrivateLayout, PublicLayout } from '../layouts';

const useAuth = () => {
   const [isAuth, setIsAuth] = useState(false);
   return { isAuth, setIsAuth };
};

const Navigation: FC = () => {
   const { isAuth } = useAuth();
   return isAuth ? <PrivateLayout /> : <PublicLayout />;
};

export default Navigation;
