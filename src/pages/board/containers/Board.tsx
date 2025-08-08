import React from 'react';
import { BoardProvider } from '../context';
import { BoardComponent } from '../components';

const Board: React.FC = () => {
   return (
      <BoardProvider>
         <BoardComponent />
      </BoardProvider>
   );
};

export default Board;
