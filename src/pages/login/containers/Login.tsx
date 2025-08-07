import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import LoginComponent from '../components';
import { User } from '../../../types';
import { userLogin } from '../actions';

const Login: React.FC = () => {
   const dispatch = useDispatch();

   const handleChange = useCallback(
      (user: User) => {
         userLogin(user)(dispatch);
      },
      [dispatch]
   );

   return <LoginComponent handleChange={handleChange} />;
};

export default Login;
