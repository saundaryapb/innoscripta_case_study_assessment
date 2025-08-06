// Login state interface
export interface LoginState {
   isLoading: boolean;
   isAuthenticated: boolean;
   user: any | null;
   error: string | null;
}

// Initial state
const initialState: LoginState = {
   isLoading: false,
   isAuthenticated: false,
   user: null,
   error: null,
};

// Login reducer
const loginReducer = (state = initialState, action: any): LoginState => {
   switch (action.type) {
      default:
         return state;
   }
};

export default loginReducer;
