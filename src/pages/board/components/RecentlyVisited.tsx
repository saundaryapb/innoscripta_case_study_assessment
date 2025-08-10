import React from 'react';
import { CustomCard } from '../../../shared/components';
import { VisitedIssue, formatVisitedTime } from '../helpers';
import { boardStyles } from './styles';

interface RecentlyVisitedProps {
   visitedIssues: VisitedIssue[];
}

const RecentlyVisited: React.FC<RecentlyVisitedProps> = ({ visitedIssues }) => {
   if (visitedIssues.length === 0) {
      return (
         <div style={boardStyles.recentlyVisitedContainer}>
            <h3 style={boardStyles.recentlyVisitedTitle}>Recently Visited</h3>
            <CustomCard style={boardStyles.recentlyVisitedEmpty}>No recently visited issues</CustomCard>
         </div>
      );
   }

   return (
      <div style={boardStyles.recentlyVisitedContainer}>
         <h3 style={boardStyles.recentlyVisitedTitle}>Recently Visited</h3>
         <div style={boardStyles.recentlyVisitedList}>
            {visitedIssues.map((issue) => (
               <CustomCard key={issue.id} style={boardStyles.recentlyVisitedItem}>
                  <div style={boardStyles.recentlyVisitedItemHeader}>
                     <span style={boardStyles.recentlyVisitedItemId}>#{issue.id}</span>
                     <span style={boardStyles.recentlyVisitedItemTime}>{formatVisitedTime(issue.visitedAt)}</span>
                  </div>
                  <h4 style={boardStyles.recentlyVisitedItemTitle}>{issue.title}</h4>
                  <div style={boardStyles.recentlyVisitedItemStatus}>{issue.status}</div>
               </CustomCard>
            ))}
         </div>
      </div>
   );
};

export default RecentlyVisited;
