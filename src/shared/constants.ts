import { User } from '../types';

export enum RoleTypes {
   ADMIN = 'admin',
   CONTRIBUTOR = 'contributor',
}

export enum Priority {
   HIGH = 'high',
   MEDIUM = 'medium',
   LOW = 'low',
}

export enum PriorityColor {
   HIGH = '#ff4d4f',
   MEDIUM = '#faad14',
   LOW = '#52c41a',
   DEFAULT = '#d9d9d9',
}

export enum IssueStatus {
   BACKLOG = 'Backlog',
   TODO = 'Todo',
   IN_PROGRESS = 'In Progress',
   IN_REVIEW = 'In Review',
   DONE = 'Done',
}

export enum Assignee {
   ALICE = 'alice',
   BOB = 'bob',
   CAROL = 'carol',
   PRIYA = 'priya',
   ARJUN = 'arjun',
   KAVYA = 'kavya',
   RAHUL = 'rahul',
   ANANYA = 'ananya',
   VIKRAM = 'vikram',
   SHREYA = 'shreya',
   DEV = 'dev',
   MEERA = 'meera',
   ROHIT = 'rohit',
   POOJA = 'pooja',
   ADITYA = 'aditya',
   NEHA = 'neha',
   KARAN = 'karan',
   RIYA = 'riya',
   NISHANT = 'nishant',
   DEEPIKA = 'deepika',
   MANISH = 'manish',
   SANYA = 'sanya',
   RAJ = 'raj',
}

export const users: User[] = [
   {
      name: 'Alice Brown',
      role: RoleTypes.ADMIN,
   },
   {
      name: 'Bob Smith',
      role: RoleTypes.CONTRIBUTOR,
   },
   {
      name: 'John Cena',
      role: RoleTypes.ADMIN,
   },
   {
      name: 'Robert Johnson',
      role: RoleTypes.CONTRIBUTOR,
   },
];

export const ROUTE_COLLECTION = {
   BOARD: '/board',
   ISSUE: '/issue',
   ISSUE_DETAIL: '/issue/:id',
} as const;
