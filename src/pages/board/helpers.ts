import { Issue } from '../../types';
import { Priority } from '../../shared/constants';

export const createOptionsFromEnum = (enumObject: Record<string, string>) => {
   return Object.values(enumObject).map((value) => ({
      value,
      label: value.charAt(0).toUpperCase() + value.slice(1),
   }));
};

export const structureDataByPriority = (issues: Issue[]) => {
   return {
      low: issues.filter((issue) => issue.priority === Priority.LOW),
      medium: issues.filter((issue) => issue.priority === Priority.MEDIUM),
      high: issues.filter((issue) => issue.priority === Priority.HIGH),
   };
};

export const getNextBatchIndex = (currentIndex: number, totalLength: number) => {
   const batchSize = currentIndex === 0 ? 5 : 3;
   const newIndex = currentIndex + batchSize;
   return Math.min(newIndex, totalLength);
};
