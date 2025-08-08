import { Issue } from '../../types';
import { IssueStatus } from '../../shared/constants';

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
