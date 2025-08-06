import { createStore, combineReducers } from 'redux';

export interface RootState {}

const rootReducer = combineReducers({});

const store = createStore(rootReducer);

export default store;
