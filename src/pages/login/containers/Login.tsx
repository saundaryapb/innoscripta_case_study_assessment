import React from 'react';
import LoginComponent from '../components';
import { User } from '../../../types';

const Login: React.FC = () => {
   const handleChange = (user: User) => {
      console.log('User changed:', user);
   };

   return <LoginComponent handleChange={handleChange} />;
};

export default Login;
