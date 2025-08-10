export enum ISSUE_HANDLE_CHANGE_ACTIONS {
   NAVIGATE_BACK = 'NAVIGATE_BACK',
   MARK_AS_RESOLVED = 'MARK_AS_RESOLVED',
}

export enum ISSUE_STATUS {
   BACKLOG = 'Backlog',
   TODO = 'Todo',
   IN_PROGRESS = 'In Progress',
   IN_REVIEW = 'In Review',
   DONE = 'Done',
}

export const ISSUE_DETAILS_CONFIG = [
   { title: 'Assignee', key: 'assignee', prefix: '@' },
   { title: 'Reviewer', key: 'reviewer', prefix: '@' },
   { title: 'Severity', key: 'severity' },
   { title: 'Estimated Hours', key: 'estimatedHours', suffix: 'h' },
   { title: 'Created', key: 'createdAt', isDate: true },
];
