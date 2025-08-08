import { FC, useCallback, useEffect, useState } from 'react';
import { useCustomStoreSelector } from '../../../hooks/useCustomStoreSelector';
import LayoutComponent from '../components';
import { privateRoutes } from '../routes';
import { LAYOUT_OPERATIONS } from '../constants';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../pages/login/actions';

const Layout: FC = () => {
   const [userData, setUserData] = useState({});
   const loginState = useCustomStoreSelector('login');
   const navigate = useNavigate();
   const dispatch = useDispatch();

   useEffect(() => {
      const userData = (loginState?.data as any)?.user
         ? loginState?.data
         : JSON.parse(localStorage.getItem('userData') || '{}');
      setUserData(userData);
   }, [loginState?.data]);

   const handleChange = useCallback(
      ({ key }: { key: string }) => {
         switch (key) {
            case LAYOUT_OPERATIONS.LOGOUT:
               localStorage.clear();
               navigate('/');
               logoutUser()(dispatch);
               break;
            default:
               console.log('Unknown action');
         }
      },
      [navigate, dispatch]
   );

   return <LayoutComponent routes={privateRoutes} data={userData} handleChange={handleChange} />;
};

export default Layout;
