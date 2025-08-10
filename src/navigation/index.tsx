import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PrivateLayout, PublicLayout } from '../layouts';
import { CustomSpinner } from '../shared/components';
import { useCustomStoreSelector } from '../hooks/useCustomStoreSelector';
import { ROUTE_COLLECTION } from '../shared/constants';

const Navigation: FC = () => {
   const navigate = useNavigate();
   const sharedState = useCustomStoreSelector('shared');
   const loginState = useCustomStoreSelector('login');
   const isAuth = loginState.isAuth || localStorage.getItem('isAuth') === 'true';
   const isLoaderVisible = sharedState.loader.isVisible;

   useEffect(() => {
      if (loginState.isAuth && !localStorage.getItem('isAuth')) {
         navigate(ROUTE_COLLECTION.BOARD);
         localStorage.setItem('isAuth', 'true');
         localStorage.setItem('userData', JSON.stringify(loginState.data || {}));
      }
   }, [loginState.isAuth, loginState.data, navigate]);

   return (
      <>
         <CustomSpinner isLoading={isLoaderVisible} />
         {isAuth ? <PrivateLayout /> : <PublicLayout />}
      </>
   );
};

export default Navigation;
