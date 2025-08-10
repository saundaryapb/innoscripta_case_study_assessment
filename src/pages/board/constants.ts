export enum FILTER_HANDLE_CHANGE_ACTIONS {
   SEARCH_ISSUES = 'issueSearched',
   SET_ASSIGNEES = 'selectedAssignees',
   SET_SEVERITIES = 'selectedSeverities',
   CLEAR_FILTERS = 'CLEAR_FILTERS',
}

export enum BOARD_HANDLE_CHANGE_ACTIONS {
   DRAG_END = 'DRAG_END',
   MOVE_ISSUE = 'MOVE_ISSUE',
   OPEN_ISSUE = 'OPEN_ISSUE',
}

export enum BOARD_ACTION_TYPES {
   SET_DATA = 'SET_DATA',
   UPDATE_DATA = 'UPDATE_DATA',
   CLEAR_FILTERS = 'CLEAR_FILTERS',
}

export enum API_CONFIG {
   BATCH_SIZE = 5,
   POLLING_INTERVAL = 5000, // 5 seconds in milliseconds
}

export enum KanbanColumnId {
   BACKLOG = 'backlog',
   TODO = 'todo',
   IN_PROGRESS = 'inProgress',
   IN_REVIEW = 'inReview',
   DONE = 'done',
}

export const KANBAN_COLUMNS = [
   { id: KanbanColumnId.BACKLOG, title: 'Backlog', key: 'backlog' as const },
   { id: KanbanColumnId.TODO, title: 'To Do', key: 'todo' as const },
   { id: KanbanColumnId.IN_PROGRESS, title: 'In Progress', key: 'inProgress' as const },
   { id: KanbanColumnId.IN_REVIEW, title: 'In Review', key: 'inReview' as const },
   { id: KanbanColumnId.DONE, title: 'Done', key: 'done' as const },
] as const;
