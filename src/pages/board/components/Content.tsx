import React from 'react';
import { DndContext, DragEndEvent, closestCenter, useDraggable, useDroppable } from '@dnd-kit/core';
import { Issue } from '../../../types';
import { CustomButton, CustomCard, CustomSidebar, CustomSnackbar } from '../../../shared/components';
import { KANBAN_COLUMNS, BOARD_HANDLE_CHANGE_ACTIONS } from '../constants';
import {
   getPriorityColor,
   getNextStatusFromStatusString,
   getColumnStyle,
   formatCreatedDate,
   isAdminUser,
   getDragProps,
   getCardStyleWithRole,
   VisitedIssue,
} from '../helpers';
import { boardStyles } from './styles';
import RecentlyVisited from './RecentlyVisited';

interface ContentData {
   backlog: Issue[];
   todo: Issue[];
   inProgress: Issue[];
   inReview: Issue[];
   done: Issue[];
}

interface ContentProps {
   data?: ContentData;
   user: any;
   handleChange: (actionType: string, payload?: any) => void;
   showUndo?: boolean;
   undoMessage?: string;
   visitedIssues?: VisitedIssue[];
   isSidebarOpen?: boolean;
}

const DroppableColumn: React.FC<{
   id: string;
   title: string;
   issues: Issue[];
   user: any;
   handleChange: (actionType: string, payload?: any) => void;
}> = ({ id, title, issues, user, handleChange }) => {
   const { isOver, setNodeRef } = useDroppable({
      id,
   });

   const columnStyle = getColumnStyle(boardStyles.kanbanColumn, isOver);

   return (
      <div ref={setNodeRef} style={columnStyle}>
         <h3 style={boardStyles.kanbanColumnHeader}>
            {title} ({issues.length})
         </h3>

         <div style={boardStyles.kanbanColumnContent}>
            {issues.map((issue) => (
               <IssueCard key={issue.id} user={user} issue={issue} handleChange={handleChange} />
            ))}
         </div>
      </div>
   );
};

const IssueCard: React.FC<{
   issue: Issue;
   user: any;
   handleChange: (actionType: string, payload?: any) => void;
}> = ({ issue, user, handleChange }) => {
   const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
      id: issue.id,
   });

   const nextStatus = getNextStatusFromStatusString(issue.status);
   const dragProps = getDragProps(user, listeners, attributes);
   const cardStyleWithRole = getCardStyleWithRole(boardStyles.issueCard, isDragging, transform, user);

   const handleMoveClick = () => {
      if (nextStatus) {
         handleChange(BOARD_HANDLE_CHANGE_ACTIONS.MOVE_ISSUE, { issueId: issue.id, newStatus: nextStatus });
      }
   };

   return (
      <div ref={setNodeRef} style={cardStyleWithRole} {...dragProps}>
         <CustomCard>
            <div style={boardStyles.issueHeader}>
               <span style={boardStyles.issueId}>#{issue.id}</span>
               <span
                  style={{
                     ...boardStyles.priorityIndicator,
                     backgroundColor: getPriorityColor(issue.priority),
                  }}
               />
            </div>

            <h4 style={boardStyles.issueTitle}>{issue.title}</h4>

            <div style={boardStyles.issueFooter}>
               <span>@{issue.assignee}</span>
               <span>Severity: {issue.severity}</span>
            </div>

            <div style={boardStyles.issueMetadata}>
               <div style={boardStyles.issueCreatedDate}>Created: {formatCreatedDate(issue.createdAt)}</div>
               <div style={boardStyles.tagsContainer}>
                  <span style={boardStyles.tagsLabel}>Tags:</span>
                  {issue.tags.map((tag, index) => (
                     <span key={index} style={boardStyles.tagItem}>
                        {tag}
                     </span>
                  ))}
               </div>
            </div>

            <CustomButton
               handleClick={() => handleChange(BOARD_HANDLE_CHANGE_ACTIONS.OPEN_ISSUE, { issue })}
               style={boardStyles.moveButton}
               variant="primary"
               label={`Open Issue`}
               stopPropagation={true}
            />

            {nextStatus && isAdminUser(user) && (
               <CustomButton
                  handleClick={handleMoveClick}
                  style={boardStyles.moveButton}
                  variant="primary"
                  label={`Move to ${nextStatus}`}
                  stopPropagation={true}
               />
            )}
         </CustomCard>
      </div>
   );
};

const Content: React.FC<ContentProps> = ({
   data,
   user,
   handleChange,
   showUndo = false,
   undoMessage = '',
   visitedIssues = [],
   isSidebarOpen = false,
}) => {
   if (!data) {
      return <div style={boardStyles.loadingContainer}>Loading Kanban Board...</div>;
   }

   const handleDragEnd = (event: DragEndEvent) => {
      handleChange(BOARD_HANDLE_CHANGE_ACTIONS.DRAG_END, event);
   };

   const columns = KANBAN_COLUMNS.map((column) => ({
      ...column,
      issues: data[column.key],
   }));

   return (
      <div style={boardStyles.kanbanContainer}>
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={boardStyles.kanbanTitle}>Project Board</h2>
            <CustomButton
               label="Recently Visited"
               variant="secondary"
               handleClick={() => handleChange(BOARD_HANDLE_CHANGE_ACTIONS.HANDLE_SIDEBAR, { isOpen: true })}
            />
         </div>

         <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <div style={boardStyles.kanbanBoard}>
               {columns.map((column) => (
                  <DroppableColumn
                     key={column.id}
                     id={column.id}
                     title={column.title}
                     issues={column.issues}
                     user={user}
                     handleChange={handleChange}
                  />
               ))}
            </div>
         </DndContext>

         {showUndo && (
            <CustomSnackbar
               open={showUndo}
               message={undoMessage}
               handleChange={(actionOrOpen: any) => {
                  if (typeof actionOrOpen === 'boolean') {
                     if (!actionOrOpen) {
                        handleChange(BOARD_HANDLE_CHANGE_ACTIONS.CLOSE_UNDO_SNACKBAR);
                     }
                  } else {
                     handleChange(actionOrOpen);
                  }
               }}
               action={{
                  label: 'Undo',
                  type: BOARD_HANDLE_CHANGE_ACTIONS.UNDO_ISSUE,
               }}
            />
         )}

         <CustomSidebar
            isOpen={isSidebarOpen}
            onClose={() => handleChange(BOARD_HANDLE_CHANGE_ACTIONS.HANDLE_SIDEBAR, { isOpen: false })}
            title="Recently Visited Issues"
            style={boardStyles.sidebar}
         >
            <RecentlyVisited visitedIssues={visitedIssues} />
         </CustomSidebar>
      </div>
   );
};

export default Content;
