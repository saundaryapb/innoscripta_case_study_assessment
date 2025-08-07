import { createStore, combineReducers } from 'redux';
import sharedReducer from '../shared/reducer';
import loginReducer from '../pages/login/reducer';

export interface RootState {
   shared: ReturnType<typeof sharedReducer>;
   login: ReturnType<typeof loginReducer>;
}

const rootReducer = combineReducers({
   shared: sharedReducer,
   login: loginReducer,
});

const store = createStore(rootReducer);

export default store;
