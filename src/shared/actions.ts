export const SET_LOADER_VISIBILITY = 'SET_LOADER_VISIBILITY';

export const setLoaderVisibility = (isVisible: boolean) => ({
   type: SET_LOADER_VISIBILITY,
   payload: isVisible,
});
