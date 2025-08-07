import { combineReducers } from 'redux';
import { SET_LOADER_VISIBILITY } from './actions';

interface SetLoaderVisibilityAction {
   type: typeof SET_LOADER_VISIBILITY;
   payload: boolean;
}

type LoaderActionTypes = SetLoaderVisibilityAction;

interface LoaderState {
   isVisible: boolean;
}

const initialLoaderState: LoaderState = {
   isVisible: false,
};

const loaderReducer = (state: LoaderState = initialLoaderState, action: LoaderActionTypes): LoaderState => {
   switch (action.type) {
      case SET_LOADER_VISIBILITY:
         return {
            ...state,
            isVisible: action.payload,
         };
      default:
         return state;
   }
};

const sharedReducer = combineReducers({
   loader: loaderReducer,
});

export default sharedReducer;
