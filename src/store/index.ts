import { createStore, combineReducers } from 'redux';
import sharedReducer from '../shared/reducer';

export interface RootState {
   shared: ReturnType<typeof sharedReducer>;
}

const rootReducer = combineReducers({
   shared: sharedReducer,
});

const store = createStore(rootReducer);

export default store;
