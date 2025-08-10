import { Priority, PriorityColor } from '../../shared/constants';

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
