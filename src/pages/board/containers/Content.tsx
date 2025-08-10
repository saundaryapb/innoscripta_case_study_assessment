import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setContentData } from '../actions';
import { useBoardContext } from '../context';
import { mockFetchIssues } from '../../../utils/api';
import { BOARD_ACTION_TYPES, API_CONFIG, BOARD_HANDLE_CHANGE_ACTIONS } from '../constants';
import { Issue } from '../../../types';
import { getStatusFromContainerId, filterAndStructureIssues, addVisitedIssue, getVisitedIssues } from '../helpers';
import { ContentComponent } from '../components';
import { useCustomStoreSelector } from '../../../hooks/useCustomStoreSelector';
import { getUserFromStorage } from '../../../shared/helpers';

const Content: React.FC = () => {
   const { state, dispatch: contextDispatch } = useBoardContext();
   const { data } = state;
   const reduxDispatch = useDispatch();
   const boardData = useCustomStoreSelector('board');
   const contentData = useMemo(() => boardData.contentData || [], [boardData.contentData]);

   const navigate = useNavigate();

   const allIssuesRef = useRef<Issue[]>([]);
   const contentDataRef = useRef<Issue[]>([]);
   const intervalRef = useRef<NodeJS.Timeout | null>(null);
   const batchIndexRef = useRef(0);
   const [showUndo, setShowUndo] = useState(false);
   const [undoData, setUndoData] = useState<{
      issue: Issue;
      previousStatus: string;
      message: string;
   } | null>(null);
   const [visitedIssues, setVisitedIssues] = useState(() => getVisitedIssues());
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

   const user = useMemo(() => getUserFromStorage(), []);

   // Step 3: As soon as contentData changes, structure it by status with filters applied
   useEffect(() => {
      const issuesData = (contentData as unknown as Issue[]) ?? [];
      contentDataRef.current = issuesData;

      const { issueSearched = '', selectedAssignees = [], selectedSeverities = [] } = data;

      const structuredData = filterAndStructureIssues(issuesData, issueSearched, selectedAssignees, selectedSeverities);

      contextDispatch({
         type: BOARD_ACTION_TYPES.UPDATE_DATA,
         key: 'filteredIssues',
         payload: structuredData,
      });
   }, [contentData, data.issueSearched, data.selectedAssignees, data.selectedSeverities, contextDispatch]);

   // Step 2: Load next batch of issues and append to contentData
   const loadNextBatch = useCallback(() => {
      const start = batchIndexRef.current * API_CONFIG.BATCH_SIZE;
      const end = start + API_CONFIG.BATCH_SIZE;
      const nextBatch = allIssuesRef.current.slice(start, end);

      if (nextBatch.length > 0) {
         reduxDispatch(setContentData([...contentDataRef.current, ...nextBatch]));
         batchIndexRef.current += 1;
      }

      if (end >= allIssuesRef.current.length) {
         if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
         }
      }
   }, [reduxDispatch]);

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
         const currentData = (contentData as unknown as Issue[]) ?? [];

         switch (actionType) {
            case BOARD_HANDLE_CHANGE_ACTIONS.DRAG_END:
               // Handle drag and drop
               const { active, over } = payload;

               if (!over || active.id === over.id) return;

               const issueId = active.id;
               const newStatus = getStatusFromContainerId(over.id);

               if (!newStatus) return;

               // Find the issue to track previous state
               const issueToMove = currentData.find((issue: Issue) => issue.id === issueId);
               if (!issueToMove) return;

               const previousStatus = issueToMove.status;

               // Update the issue status in contentData
               const updatedDataFromDrag = currentData.map((issue: Issue) =>
                  issue.id === issueId ? { ...issue, status: newStatus } : issue
               );

               // Dispatch updated contentData
               reduxDispatch(setContentData(updatedDataFromDrag));
               setUndoData({
                  issue: issueToMove,
                  previousStatus,
                  message: `Moved issue #${issueId} to ${newStatus}`,
               });
               setShowUndo(true);
               break;

            case BOARD_HANDLE_CHANGE_ACTIONS.MOVE_ISSUE:
               // Handle button-based move
               const { issueId: moveIssueId, newStatus: moveNewStatus } = payload;
               const issueToMoveButton = currentData.find((issue: Issue) => issue.id === moveIssueId);
               if (!issueToMoveButton) return;

               const previousMoveStatus = issueToMoveButton.status;

               // Update the issue status in contentData
               const updatedDataFromMove = currentData.map((issue: Issue) =>
                  issue.id === moveIssueId ? { ...issue, status: moveNewStatus } : issue
               );

               // Dispatch updated contentData
               reduxDispatch(setContentData(updatedDataFromMove));
               setUndoData({
                  issue: issueToMoveButton,
                  previousStatus: previousMoveStatus,
                  message: `Moved issue #${moveIssueId} to ${moveNewStatus}`,
               });
               setShowUndo(true);
               break;

            case BOARD_HANDLE_CHANGE_ACTIONS.UNDO_ISSUE:
               if (undoData) {
                  const revertedData = currentData.map((issue: Issue) =>
                     issue.id === undoData.issue.id ? { ...issue, status: undoData.previousStatus } : issue
                  );

                  reduxDispatch(setContentData(revertedData));
                  setShowUndo(false);
                  setUndoData(null);
               }
               break;

            case BOARD_HANDLE_CHANGE_ACTIONS.CLOSE_UNDO_SNACKBAR:
               setShowUndo(false);
               setUndoData(null);
               break;

            case BOARD_HANDLE_CHANGE_ACTIONS.OPEN_ISSUE:
               const { issue } = payload;
               addVisitedIssue({
                  id: issue.id,
                  title: issue.title,
                  status: issue.status,
               });
               setVisitedIssues(getVisitedIssues());
               navigate(`/issue/${issue.id}`, { state: { data: issue } });
               break;

            case BOARD_HANDLE_CHANGE_ACTIONS.HANDLE_SIDEBAR:
               const { isOpen } = payload;
               setIsSidebarOpen(isOpen);
               break;

            default:
               console.warn('Unknown action type:', actionType);
         }
      },
      [contentData, reduxDispatch, navigate, undoData]
   );

   return (
      <ContentComponent
         data={data?.filteredIssues}
         handleChange={handleChange}
         user={user}
         showUndo={showUndo}
         undoMessage={undoData?.message || ''}
         visitedIssues={visitedIssues}
         isSidebarOpen={isSidebarOpen}
      />
   );
};

export default Content;
