import { Issue } from '../../types';

export const SET_CONTENT_DATA = 'SET_CONTENT_DATA';

export interface SetContentDataAction {
   type: typeof SET_CONTENT_DATA;
   payload: Issue[];
   [key: string]: any;
}
export type BoardAction = SetContentDataAction;

export const setContentData = (contentData: Issue[]): SetContentDataAction => ({
   type: SET_CONTENT_DATA,
   payload: contentData,
});
