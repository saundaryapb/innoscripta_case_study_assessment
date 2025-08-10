import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBoardContext } from '../context';
import { mockFetchIssues } from '../../../utils/api';
import { BOARD_ACTION_TYPES, API_CONFIG, BOARD_HANDLE_CHANGE_ACTIONS } from '../constants';
import { Issue } from '../../../types';
import { structureDataByStatus, getStatusFromContainerId } from '../helpers';
import { ContentComponent } from '../components';

const Content: React.FC = () => {
   const { state, dispatch } = useBoardContext();
   const { data } = state;
   const { contentData } = data;
   const navigate = useNavigate();

   const allIssuesRef = useRef<Issue[]>([]);
   const contentDataRef = useRef<Issue[]>([]);
   const intervalRef = useRef<NodeJS.Timeout | null>(null);
   const batchIndexRef = useRef(0);

   const user = useMemo(() => {
      const userDetails = localStorage.getItem('userData');
      try {
         return userDetails ? JSON.parse(userDetails).user : null;
      } catch {
         return null;
      }
   }, []);

   // Step 3: As soon as contentData changes, structure it by status
   useEffect(() => {
      const data = (contentData as any[]) ?? [];
      contentDataRef.current = data;
      const structuredData = structureDataByStatus(data);
      dispatch({
         type: BOARD_ACTION_TYPES.UPDATE_DATA,
         key: 'filteredIssues',
         payload: structuredData,
      });
   }, [contentData]);

   // Step 2: Load next batch of issues and append to contentData
   const loadNextBatch = useCallback(() => {
      const start = batchIndexRef.current * API_CONFIG.BATCH_SIZE;
      const end = start + API_CONFIG.BATCH_SIZE;
      const nextBatch = allIssuesRef.current.slice(start, end);

      if (nextBatch.length > 0) {
         dispatch({
            type: BOARD_ACTION_TYPES.UPDATE_DATA,
            key: 'contentData',
            payload: [...contentDataRef.current, ...nextBatch],
         });
         batchIndexRef.current += 1;
      }

      if (end >= allIssuesRef.current.length) {
         if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
         }
      }
   }, [dispatch]);

   // Step 1: Fetch issues (initially 5 and then 5 every 5 seconds)
   useEffect(() => {
      let isMounted = true;
      mockFetchIssues().then((fetchedData) => {
         if (!isMounted) return;

         allIssuesRef.current = fetchedData;

         // Load first batch immediately
         loadNextBatch();

         // Schedule the rest
         intervalRef.current = setInterval(loadNextBatch, API_CONFIG.POLLING_INTERVAL);
      });

      return () => {
         isMounted = false;
         if (intervalRef.current) {
            clearInterval(intervalRef.current);
         }
      };
   }, [loadNextBatch]);

   const handleChange = useCallback(
      (actionType: string, payload?: any) => {
         const currentData = (contentData as any[]) ?? [];

         switch (actionType) {
            case BOARD_HANDLE_CHANGE_ACTIONS.DRAG_END:
               // Handle drag and drop
               const { active, over } = payload;

               if (!over || active.id === over.id) return;

               const issueId = active.id;
               const newStatus = getStatusFromContainerId(over.id);

               if (!newStatus) return;

               // Update the issue status in contentData
               const updatedDataFromDrag = currentData.map((issue: Issue) =>
                  issue.id === issueId ? { ...issue, status: newStatus } : issue
               );

               // Dispatch updated contentData
               dispatch({
                  type: BOARD_ACTION_TYPES.UPDATE_DATA,
                  key: 'contentData',
                  payload: updatedDataFromDrag,
               });
               break;

            case BOARD_HANDLE_CHANGE_ACTIONS.MOVE_ISSUE:
               // Handle button-based move
               const { issueId: moveIssueId, newStatus: moveNewStatus } = payload;

               // Update the issue status in contentData
               const updatedDataFromMove = currentData.map((issue: Issue) =>
                  issue.id === moveIssueId ? { ...issue, status: moveNewStatus } : issue
               );

               // Dispatch updated contentData
               dispatch({
                  type: BOARD_ACTION_TYPES.UPDATE_DATA,
                  key: 'contentData',
                  payload: updatedDataFromMove,
               });
               break;

            case BOARD_HANDLE_CHANGE_ACTIONS.OPEN_ISSUE:
               const { issue } = payload;
               navigate(`/issue/${issue.id}`, { state: { data: issue } });
               break;

            default:
               console.warn('Unknown action type:', actionType);
         }
      },
      [contentData, dispatch, navigate]
   );

   return <ContentComponent data={data?.filteredIssues} handleChange={handleChange} user={user} />;
};

export default Content;
