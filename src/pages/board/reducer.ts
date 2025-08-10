import { Issue } from '../../types';
import { BoardAction, SET_CONTENT_DATA } from './actions';

export interface BoardState {
   contentData: Issue[];
}

const initialState: BoardState = {
   contentData: [],
};

const boardReducer = (state: BoardState = initialState, action: BoardAction): BoardState => {
   switch (action.type) {
      case SET_CONTENT_DATA:
         return {
            ...state,
            contentData: action.payload,
         };

      default:
         return state;
   }
};

export default boardReducer;
