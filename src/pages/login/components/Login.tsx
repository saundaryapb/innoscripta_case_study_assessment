import React from 'react';
import { CustomCard } from '../../../shared/components';
import { users } from '../../../shared/constants';
import { User } from '../../../types';
import { loginStyles } from './styles';
import { getUserBorderColor } from '../helper';
import './Login.css';

interface LoginProps {
   handleChange?: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ handleChange }) => {
   const { loginCard, mainHeading, subHeading, userGrid, userCard, userName, userRole } = loginStyles;

   return (
      <CustomCard style={loginCard}>
         <h1 style={mainHeading}>Quick Login</h1>
         <p style={subHeading}>Sign in as one of these demo users:</p>
         <div style={userGrid}>
            {users.map((user, index) => (
               <CustomCard
                  key={`${user.name}-${index}`}
                  handleClick={() => handleChange?.(user)}
                  style={{
                     ...userCard,
                     borderLeft: `4px solid ${getUserBorderColor(user.role)}`,
                  }}
                  className="user-card-hover"
               >
                  <h3 style={userName}>{user.name}</h3>
                  <p
                     style={{
                        ...userRole,
                        color: getUserBorderColor(user.role),
                     }}
                  >
                     {user.role}
                  </p>
               </CustomCard>
            ))}
         </div>
      </CustomCard>
   );
};

export default Login;
