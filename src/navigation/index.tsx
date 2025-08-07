import React, { FC, useState } from 'react';
import { PrivateLayout, PublicLayout } from '../layouts';
import { CustomSpinner } from '../shared/components';
import { useCustomStoreSelector } from '../hooks/useCustomStoreSelector';

const useAuth = () => {
   const [isAuth, setIsAuth] = useState(false);
   return { isAuth, setIsAuth };
};

const Navigation: FC = () => {
   const { isAuth } = useAuth();
   const sharedState = useCustomStoreSelector('shared');
   const isLoaderVisible = sharedState.loader.isVisible;

   return (
      <>
         <CustomSpinner isLoading={isLoaderVisible} />
         {isAuth ? <PrivateLayout /> : <PublicLayout />}
      </>
   );
};

export default Navigation;
