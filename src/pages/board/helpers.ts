import { Issue } from '../../types';
import { IssueStatus, Priority, PriorityColor } from '../../shared/constants';
import { KanbanColumnId } from './constants';

export const createOptionsFromEnum = (enumObject: Record<string, string>) => {
   return Object.values(enumObject).map((value) => ({
      value,
      label: value.charAt(0).toUpperCase() + value.slice(1),
   }));
};

export const structureDataByStatus = (issues: Issue[]) => {
   return {
      backlog: issues.filter((issue) => issue.status === IssueStatus.BACKLOG),
      todo: issues.filter((issue) => issue.status === IssueStatus.TODO),
      inProgress: issues.filter((issue) => issue.status === IssueStatus.IN_PROGRESS),
      inReview: issues.filter((issue) => issue.status === IssueStatus.IN_REVIEW),
      done: issues.filter((issue) => issue.status === IssueStatus.DONE),
   };
};

export const getNextBatchIndex = (currentIndex: number, totalLength: number) => {
   const batchSize = currentIndex === 0 ? 5 : 3;
   const newIndex = currentIndex + batchSize;
   return Math.min(newIndex, totalLength);
};

export const moveIssueToStatus = (issues: Issue[], issueId: string, newStatus: IssueStatus): Issue[] => {
   return issues.map((issue) => (issue.id === issueId ? { ...issue, status: newStatus } : issue));
};

export const getStatusFromContainerId = (containerId: string): IssueStatus | null => {
   const statusMap: Record<string, IssueStatus> = {
      [KanbanColumnId.BACKLOG]: IssueStatus.BACKLOG,
      [KanbanColumnId.TODO]: IssueStatus.TODO,
      [KanbanColumnId.IN_PROGRESS]: IssueStatus.IN_PROGRESS,
      [KanbanColumnId.IN_REVIEW]: IssueStatus.IN_REVIEW,
      [KanbanColumnId.DONE]: IssueStatus.DONE,
   };
   return statusMap[containerId] || null;
};

export const getNextStatus = (currentStatus: IssueStatus): IssueStatus | null => {
   const statusFlow: Record<IssueStatus, IssueStatus | null> = {
      [IssueStatus.BACKLOG]: IssueStatus.TODO,
      [IssueStatus.TODO]: IssueStatus.IN_PROGRESS,
      [IssueStatus.IN_PROGRESS]: IssueStatus.IN_REVIEW,
      [IssueStatus.IN_REVIEW]: IssueStatus.DONE,
      [IssueStatus.DONE]: null,
   };
   return statusFlow[currentStatus];
};

export const getPreviousStatus = (currentStatus: IssueStatus): IssueStatus | null => {
   const statusFlow: Record<IssueStatus, IssueStatus | null> = {
      [IssueStatus.BACKLOG]: null,
      [IssueStatus.TODO]: IssueStatus.BACKLOG,
      [IssueStatus.IN_PROGRESS]: IssueStatus.TODO,
      [IssueStatus.IN_REVIEW]: IssueStatus.IN_PROGRESS,
      [IssueStatus.DONE]: IssueStatus.IN_REVIEW,
   };
   return statusFlow[currentStatus];
};

export const getPriorityColor = (priority: string): string => {
   switch (priority) {
      case Priority.HIGH:
         return PriorityColor.HIGH;
      case Priority.MEDIUM:
         return PriorityColor.MEDIUM;
      case Priority.LOW:
         return PriorityColor.LOW;
      default:
         return PriorityColor.DEFAULT;
   }
};

export const getNextStatusFromStatusString = (currentStatus: string): IssueStatus | null => {
   const statusMap: Record<string, IssueStatus | null> = {
      [IssueStatus.BACKLOG]: IssueStatus.TODO,
      [IssueStatus.TODO]: IssueStatus.IN_PROGRESS,
      [IssueStatus.IN_PROGRESS]: IssueStatus.IN_REVIEW,
      [IssueStatus.IN_REVIEW]: IssueStatus.DONE,
      [IssueStatus.DONE]: null,
   };
   return statusMap[currentStatus] || null;
};

export const getColumnStyle = (baseStyle: any, isOver: boolean) => {
   return {
      ...baseStyle,
      backgroundColor: isOver ? '#e6f7ff' : baseStyle.backgroundColor,
   };
};

export const getCardStyle = (baseStyle: any, isDragging: boolean, transform: any) => {
   return {
      ...baseStyle,
      ...(isDragging ? { opacity: 0.5, transform: 'rotate(5deg)' } : {}),
      transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
   };
};

export const formatCreatedDate = (dateString: string): string => {
   return new Date(dateString).toLocaleDateString();
};
