import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const useCustomStoreSelector = <K extends keyof RootState>(stateSlice: K): RootState[K] => {
   return useSelector((state: RootState) => state[stateSlice]);
};
