export interface Issue {
   id: string;
   title: string;
   description: string;
   status: string;
   priority: string;
   severity: number;
   createdAt: string;
   assignee: string;
   reviewer: string;
   estimatedHours: number;
   tags: string[];
   userDefinedRank?: number;
}

export interface User {
   name: string;
   role: string;
}

export interface Route {
   name: string;
   path: string;
   component: React.ReactElement;
}
