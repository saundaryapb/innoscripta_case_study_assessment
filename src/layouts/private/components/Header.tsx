import React from 'react';
import { CustomButton } from '../../../shared/components';
import { headerStyles } from './styles';
import { LAYOUT_OPERATIONS } from '../constants';

interface HeaderProps {
   data: any;
   handleChange: (action: { key: string }) => void;
}

const Header: React.FC<HeaderProps> = ({ data, handleChange }) => {
   const user = data?.user || {};
   const userName = user?.name;
   const userRole = user?.role;

   return (
      <header style={headerStyles.header}>
         <h1 style={headerStyles.title}>🧠 Issue Board</h1>

         <div style={headerStyles.rightSection}>
            <div style={headerStyles.userCard}>
               <span style={headerStyles.userName}>{userName}</span>
               <span style={headerStyles.userRole}>{userRole}</span>
            </div>

            <CustomButton
               style={headerStyles.logoutButton}
               handleClick={() => handleChange({ key: LAYOUT_OPERATIONS.LOGOUT })}
               variant="secondary"
               label="Logout"
            />
         </div>
      </header>
   );
};

export default Header;
