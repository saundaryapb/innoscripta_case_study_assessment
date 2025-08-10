import { Issue } from '../../types';
import { IssueStatus, Priority, PriorityColor, RoleTypes } from '../../shared/constants';
import { KanbanColumnId } from './constants';

export const createOptionsFromEnum = (enumObject: Record<string, string>) => {
   return Object.values(enumObject).map((value) => ({
      value,
      label: value.charAt(0).toUpperCase() + value.slice(1),
   }));
};

export const calculateDaysSinceCreated = (createdAt: string): number => {
   const createdDate = new Date(createdAt);
   const currentDate = new Date();
   const timeDifference = currentDate.getTime() - createdDate.getTime();
   return Math.floor(timeDifference / (1000 * 3600 * 24));
};

export const calculatePriorityScore = (issue: Issue): number => {
   const severity = issue.severity;
   const daysSinceCreated = calculateDaysSinceCreated(issue.createdAt);
   const userDefinedRank = issue.userDefinedRank || 0;

   return severity * 10 + daysSinceCreated * -1 + userDefinedRank;
};

export const sortIssuesByPriority = (issues: Issue[]): Issue[] => {
   return [...issues].sort((a, b) => {
      const scoreA = calculatePriorityScore(a);
      const scoreB = calculatePriorityScore(b);

      if (scoreA !== scoreB) {
         return scoreB - scoreA; // Higher score first
      }

      // If scores match, newer issues should appear higher
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA; // Newer date first
   });
};

export const filterIssues = (
   issues: Issue[],
   searchTerm: string = '',
   selectedAssignees: string[] = [],
   selectedSeverities: string[] = []
): Issue[] => {
   return issues.filter((issue) => {
      // Search by title or tags (case-insensitive)
      const matchesSearch =
         searchTerm === '' ||
         issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
         issue.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      // Filter by assignee
      const matchesAssignee = selectedAssignees.length === 0 || selectedAssignees.includes(issue.assignee);

      // Filter by priority (high, medium, low)
      const matchesPriority = selectedSeverities.length === 0 || selectedSeverities.includes(issue.priority);

      return matchesSearch && matchesAssignee && matchesPriority;
   });
};

export const structureDataByStatus = (issues: Issue[]) => {
   return {
      backlog: sortIssuesByPriority(issues.filter((issue) => issue.status === IssueStatus.BACKLOG)),
      todo: sortIssuesByPriority(issues.filter((issue) => issue.status === IssueStatus.TODO)),
      inProgress: sortIssuesByPriority(issues.filter((issue) => issue.status === IssueStatus.IN_PROGRESS)),
      inReview: sortIssuesByPriority(issues.filter((issue) => issue.status === IssueStatus.IN_REVIEW)),
      done: sortIssuesByPriority(issues.filter((issue) => issue.status === IssueStatus.DONE)),
   };
};

export const filterAndStructureIssues = (
   issues: Issue[],
   searchTerm: string = '',
   selectedAssignees: string[] = [],
   selectedSeverities: string[] = []
) => {
   const filteredIssues = filterIssues(issues, searchTerm, selectedAssignees, selectedSeverities);
   return structureDataByStatus(filteredIssues);
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

export const isAdminUser = (user: any): boolean => {
   return user?.role === RoleTypes.ADMIN;
};

export const getDragProps = (user: any, listeners: any, attributes: any) => {
   return isAdminUser(user) ? { ...listeners, ...attributes } : {};
};

export const getCardStyleWithRole = (baseStyle: any, isDragging: boolean, transform: any, user: any) => {
   return {
      ...getCardStyle(baseStyle, isDragging, transform),
      cursor: isAdminUser(user) ? 'grab' : 'default',
   };
};
