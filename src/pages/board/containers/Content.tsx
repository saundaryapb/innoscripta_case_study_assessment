import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ContentComponent } from '../components';
import { useBoardContext } from '../context';
import { mockFetchIssues } from '../../../utils/api';
import { BOARD_ACTION_TYPES } from '../constants';
import { Issue } from '../../../types';
import { structureDataByPriority, getNextBatchIndex } from '../helpers';

const Content: React.FC = () => {
   const { state, dispatch } = useBoardContext();
   const { data } = state;
   const [allIssues, setAllIssues] = useState<Issue[]>([]);
   const [currentIndex, setCurrentIndex] = useState(0);
   const intervalRef = useRef<NodeJS.Timeout | null>(null);

   const updateContentData = useCallback(
      (data: Issue[]) => {
         const structuredData = structureDataByPriority(data);
         dispatch({
            type: BOARD_ACTION_TYPES.UPDATE_DATA,
            key: 'contentData',
            payload: structuredData,
         });
      },
      [dispatch]
   );

   const fetchNextBatch = useCallback(() => {
      setCurrentIndex((prevIndex) => {
         const actualNewIndex = getNextBatchIndex(prevIndex, allIssues.length);

         const data = allIssues.slice(0, actualNewIndex);
         updateContentData(data);

         // Check if we've reached the end
         if (actualNewIndex >= allIssues.length) {
            if (intervalRef.current) {
               clearInterval(intervalRef.current);
               intervalRef.current = null;
            }
         }

         return actualNewIndex;
      });
   }, [allIssues, updateContentData]);

   const startPolling = useCallback(() => {
      fetchNextBatch();
      intervalRef.current = setInterval(() => {
         fetchNextBatch();
      }, 5000);
   }, [fetchNextBatch]);

   const initializeData = useCallback(async () => {
      try {
         const issues = await mockFetchIssues();
         setAllIssues(issues);
      } catch (error) {
         console.error('Error fetching issues:', error);
      }
   }, []);

   useEffect(() => {
      initializeData();
      return () => {
         if (intervalRef.current) {
            clearInterval(intervalRef.current);
         }
      };
   }, [initializeData]);

   useEffect(() => {
      if (allIssues.length > 0 && currentIndex === 0) {
         startPolling();
      }
   }, [allIssues, currentIndex, startPolling]);

   return <ContentComponent />;
};

export default Content;
