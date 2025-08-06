export interface Issue {
   id: string;
   title: string;
   status: string;
   priority: string;
   severity: number;
   createdAt: string;
   assignee: string;
   tags: string[];
}

export interface User {
   name: string;
   role: string;
}

export interface Route {
   name: string;
   path: string;
   component?: React.ComponentType;
}
