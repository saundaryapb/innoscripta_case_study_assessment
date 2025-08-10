export const getUserFromStorage = () => {
   const userDetails = localStorage.getItem('userData');
   try {
      return userDetails ? JSON.parse(userDetails).user : null;
   } catch {
      return null;
   }
};
