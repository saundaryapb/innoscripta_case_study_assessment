export enum ISSUE_HANDLE_CHANGE_ACTIONS {
   NAVIGATE_BACK = 'NAVIGATE_BACK',
   MARK_AS_RESOLVED = 'MARK_AS_RESOLVED',
}

export enum ISSUE_STATUS {
   BACKLOG = 'backlog',
   TODO = 'todo',
   IN_PROGRESS = 'inProgress',
   IN_REVIEW = 'inReview',
   DONE = 'done',
}

export const ISSUE_DETAILS_CONFIG = [
   { title: 'Assignee', key: 'assignee', prefix: '@' },
   { title: 'Reviewer', key: 'reviewer', prefix: '@' },
   { title: 'Severity', key: 'severity' },
   { title: 'Estimated Hours', key: 'estimatedHours', suffix: 'h' },
   { title: 'Created', key: 'createdAt', isDate: true },
];
