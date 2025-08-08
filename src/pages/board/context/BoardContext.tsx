import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface BoardState {
   data: any;
}

type BoardAction = { type: 'SET_DATA'; payload: any };

interface BoardContextType {
   state: BoardState;
   dispatch: React.Dispatch<BoardAction>;
}

const initialState: BoardState = {
   data: null,
};

const boardReducer = (state: BoardState, action: BoardAction): BoardState => {
   switch (action.type) {
      case 'SET_DATA':
         return { ...state, data: action.payload };
      default:
         return state;
   }
};

const BoardContext = createContext<BoardContextType | undefined>(undefined);

interface BoardProviderProps {
   children: ReactNode;
}

export const BoardProvider: React.FC<BoardProviderProps> = ({ children }) => {
   const [state, dispatch] = useReducer(boardReducer, initialState);

   const value: BoardContextType = {
      state,
      dispatch,
   };

   return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>;
};

export const useBoardContext = (): BoardContextType => {
   const context = useContext(BoardContext);
   if (context === undefined) {
      throw new Error('useBoardContext must be used within a BoardProvider');
   }
   return context;
};

export default BoardContext;
