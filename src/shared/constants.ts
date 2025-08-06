import { User } from "../types";

export enum RoleTypes {
   ADMIN = "admin",
   CONTRIBUTOR = "contributor",
}

export const users: User[] = [
   {
      name: "Alice Brown",
      role: RoleTypes.ADMIN,
   },
   {
      name: "Bob Smith",
      role: RoleTypes.CONTRIBUTOR,
   },
   {
      name: "John Cena",
      role: RoleTypes.ADMIN,
   },
   {
      name: "Robert Johnson",
      role: RoleTypes.CONTRIBUTOR,
   },
];

export const ROUTE_COLLECTION = {
   BOARD: "/board",
   ISSUE: "/issue",
   ISSUE_DETAIL: "/issue/:id",
} as const;
