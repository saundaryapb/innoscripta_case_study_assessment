import { Priority, PriorityColor } from '../../shared/constants';
import { Issue } from '../../types';
import { ISSUE_DETAILS_CONFIG } from './constants';

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

export const formatDate = (dateString: string): string => {
   return new Date(dateString).toLocaleDateString();
};

export const getPriorityLabel = (priority: string): string => {
   return priority.toUpperCase();
};

export const generateIssueDetails = (data: Issue) => {
   return ISSUE_DETAILS_CONFIG.map((config) => {
      let value = data[config.key as keyof Issue] as string | number;

      if (config.isDate) {
         value = formatDate(value as string);
      }

      if (config.prefix) {
         value = `${config.prefix}${value}`;
      }

      if (config.suffix) {
         value = `${value}${config.suffix}`;
      }

      return {
         title: config.title,
         value: value,
      };
   });
};
