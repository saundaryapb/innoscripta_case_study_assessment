import { createStore, combineReducers } from 'redux';
import sharedReducer from '../shared/reducer';
import loginReducer from '../pages/login/reducer';
import boardReducer from '../pages/board/reducer';

export interface RootState {
   shared: ReturnType<typeof sharedReducer>;
   login: ReturnType<typeof loginReducer>;
   board: ReturnType<typeof boardReducer>;
}

const rootReducer = combineReducers({
   shared: sharedReducer,
   login: loginReducer,
   board: boardReducer,
});

const store = createStore(rootReducer);

export default store;
