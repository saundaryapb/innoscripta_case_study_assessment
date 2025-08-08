import { Dispatch } from 'redux';
import { mockApiCall } from '../../utils/api';
import { setLoaderVisibility } from '../../shared/actions';
import { User } from '../../types';

export const USER_LOGIN_LOADING = 'USER_LOGIN_LOADING';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_ERROR = 'USER_LOGIN_ERROR';
export const USER_LOGOUT = 'USER_LOGOUT';

export interface LoginApiResponse {
   user: User;
}

export const userLoginLoading = () => ({
   type: USER_LOGIN_LOADING,
});

export const userLoginSuccess = (data: LoginApiResponse) => ({
   type: USER_LOGIN_SUCCESS,
   payload: data,
});

export const userLoginError = (error: string) => ({
   type: USER_LOGIN_ERROR,
   payload: error,
});

export const userLogout = () => ({
   type: USER_LOGOUT,
});

const loginApi = async (userData: User): Promise<LoginApiResponse> => {
   return await mockApiCall({
      response: {
         user: userData,
      },
      delay: 3000,
   });
};

export const userLogin = (userData: User) => {
   return async (dispatch: Dispatch) => {
      try {
         dispatch(userLoginLoading());
         dispatch(setLoaderVisibility(true));

         const response = await loginApi(userData);

         dispatch(userLoginSuccess(response));
         dispatch(setLoaderVisibility(false));
      } catch (error) {
         const errorMessage = error instanceof Error ? error.message : 'Login failed';
         dispatch(userLoginError(errorMessage));
         dispatch(setLoaderVisibility(false));
      }
   };
};

export const logoutUser = () => {
   return async (dispatch: Dispatch) => {
      dispatch(userLogout());
      dispatch(setLoaderVisibility(false));
   };
};
