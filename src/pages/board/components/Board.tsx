import React from 'react';
import { Filter } from '../containers';
import { CustomCard } from '../../../shared/components';
import { boardStyles } from './styles';

const Board: React.FC = () => {
   return (
      <div style={boardStyles.container}>
         {/* Header Section */}
         <div style={boardStyles.header}>
            <h1 style={boardStyles.title}>Issue Board</h1>
            <p style={boardStyles.subtitle}>Manage and track your project issues efficiently</p>
         </div>

         {/* Filter Section */}
         <div style={boardStyles.filterSection}>
            <CustomCard>
               <Filter />
            </CustomCard>
         </div>

         <div style={boardStyles.contentSection}>
            <div style={boardStyles.placeholder}>Board content</div>
         </div>
      </div>
   );
};

export default Board;
