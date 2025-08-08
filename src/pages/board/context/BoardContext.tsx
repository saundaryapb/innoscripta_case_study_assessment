import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { BOARD_ACTION_TYPES } from '../constants';
import { Issue } from '../../../types';

interface ContentData {
   backlog: Issue[];
   todo: Issue[];
   inProgress: Issue[];
   inReview: Issue[];
   done: Issue[];
}

interface BoardData {
   issues?: Issue[];
   issueSearched?: string;
   selectedAssignees?: string[];
   selectedSeverities?: string[];
   contentData?: ContentData;
}

interface BoardState {
   data: BoardData;
}

type BoardAction =
   | { type: BOARD_ACTION_TYPES.SET_DATA; payload: BoardData }
   | { type: BOARD_ACTION_TYPES.UPDATE_DATA; key: keyof BoardData; payload: any }
   | { type: BOARD_ACTION_TYPES.CLEAR_FILTERS };

interface BoardContextType {
   state: BoardState;
   dispatch: React.Dispatch<BoardAction>;
}

const initialState: BoardState = {
   data: {
      issues: [],
      issueSearched: '',
      selectedAssignees: [],
      selectedSeverities: [],
      contentData: {
         backlog: [],
         todo: [],
         inProgress: [],
         inReview: [],
         done: [],
      },
   },
};

const boardReducer = (state: BoardState, action: BoardAction): BoardState => {
   switch (action.type) {
      case BOARD_ACTION_TYPES.SET_DATA:
         return { ...state, data: { ...state.data, ...action.payload } };
      case BOARD_ACTION_TYPES.UPDATE_DATA:
         return {
            ...state,
            data: { ...state.data, [action.key]: action.payload },
         };
      case BOARD_ACTION_TYPES.CLEAR_FILTERS:
         return {
            ...state,
            data: {
               ...state.data,
               issueSearched: '',
               selectedAssignees: [],
               selectedSeverities: [],
            },
         };
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
