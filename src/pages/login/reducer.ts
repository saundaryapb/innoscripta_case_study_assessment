import { USER_LOGIN_LOADING, USER_LOGIN_SUCCESS, USER_LOGIN_ERROR, LoginApiResponse } from './actions';

interface LoginState {
   loading: boolean;
   data: LoginApiResponse | {};
   success: boolean;
   error: boolean;
   isAuth: boolean;
}

const initialState: LoginState = {
   loading: false,
   data: {},
   success: false,
   error: false,
   isAuth: false,
};

const loginReducer = (state = initialState, action: any): LoginState => {
   switch (action.type) {
      case USER_LOGIN_LOADING: {
         return {
            loading: true,
            data: {},
            success: false,
            error: false,
            isAuth: false,
         };
      }
      case USER_LOGIN_SUCCESS: {
         return {
            loading: false,
            data: action.payload,
            success: true,
            error: false,
            isAuth: true,
         };
      }
      case USER_LOGIN_ERROR: {
         return {
            loading: false,
            data: {},
            success: false,
            error: true,
            isAuth: false,
         };
      }
      default:
         return state;
   }
};

export default loginReducer;
