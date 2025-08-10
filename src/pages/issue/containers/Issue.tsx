import React, { useCallback, useMemo } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setContentData } from '../../board/actions';
import { ISSUE_HANDLE_CHANGE_ACTIONS, ISSUE_STATUS } from '../constants';
import { ROUTE_COLLECTION } from '../../../shared/constants';
import { useCustomStoreSelector } from '../../../hooks/useCustomStoreSelector';
import { getUserFromStorage } from '../../../shared/helpers';
import IssueComponent from '../components';

const Issue: React.FC = () => {
   const { id } = useParams<{ id: string }>();
   const location = useLocation();
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const boardData = useCustomStoreSelector('board');
   const contentData = useMemo(() => boardData.contentData || [], [boardData.contentData]);
   const data = location.state?.data;

   const user = useMemo(() => getUserFromStorage(), []);

   const handleChange = useCallback(
      (actionType: string, payload?: any) => {
         switch (actionType) {
            case ISSUE_HANDLE_CHANGE_ACTIONS.NAVIGATE_BACK:
               navigate(ROUTE_COLLECTION.BOARD);
               break;

            case ISSUE_HANDLE_CHANGE_ACTIONS.MARK_AS_RESOLVED:
               const { issueId } = payload;
               const updatedContentData = contentData.map((issue) =>
                  issue.id.toString() === issueId.toString() ? { ...issue, status: ISSUE_STATUS.DONE } : issue
               );
               dispatch(setContentData(updatedContentData));
               navigate(ROUTE_COLLECTION.BOARD);
               break;

            default:
               console.warn('Unknown action type:', actionType);
         }
      },
      [navigate, dispatch, contentData]
   );

   return <IssueComponent data={data} issueId={id} user={user} handleChange={handleChange} />;
};

export default Issue;
