import { CSSProperties } from 'react';

export const boardStyles: { [key: string]: CSSProperties } = {
   container: {
      padding: '24px',
      maxWidth: '1400px',
      margin: '0 auto',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      marginTop: '10px',
   },

   header: {
      marginBottom: '32px',
   },

   title: {
      fontSize: '24px',
      fontWeight: '600',
      color: '#1a1a1a',
      margin: '0 0 6px 0',
      letterSpacing: '-0.3px',
   },

   subtitle: {
      fontSize: '14px',
      color: '#6b7280',
      margin: '0',
      fontWeight: '400',
   },

   filterSection: {
      marginBottom: '24px',
   },

   contentSection: {
      marginTop: '24px',
   },

   placeholder: {
      padding: '48px 24px',
      textAlign: 'center' as const,
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      border: '2px dashed #e5e7eb',
      color: '#9ca3af',
      fontSize: '16px',
   },

   // Filter Section Styles
   filterContainer: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '20px',
   },

   filterRow: {
      display: 'flex',
      gap: '16px',
      alignItems: 'end',
      flexWrap: 'wrap' as const,
   },

   filterField: {
      flex: '1',
      minWidth: '250px',
   },

   filterFieldSmall: {
      flex: '0 0 200px',
      minWidth: '200px',
   },

   filterActions: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
   },

   // Kanban Board Styles
   kanbanContainer: {
      padding: '20px',
   },

   kanbanTitle: {
      textAlign: 'center' as const,
      marginBottom: '24px',
      color: '#333',
      fontSize: '24px',
      fontWeight: '600',
   },

   kanbanBoard: {
      display: 'flex',
      gap: '16px',
      minHeight: '600px',
      overflow: 'auto',
   },

   kanbanColumn: {
      flex: 1,
      minHeight: '500px',
      backgroundColor: '#f5f5f5',
      borderRadius: '8px',
      padding: '16px',
      margin: '0 8px',
   },

   kanbanColumnHeader: {
      marginBottom: '16px',
      textAlign: 'center' as const,
      color: '#333',
      borderBottom: '2px solid #ddd',
      paddingBottom: '8px',
      fontSize: '16px',
      fontWeight: '600',
   },

   kanbanColumnContent: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '8px',
   },

   issueCard: {
      backgroundColor: 'white',
      border: '1px solid #ddd',
      borderRadius: '6px',
      padding: '12px',
      cursor: 'grab',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      transition: 'all 0.2s ease',
   },

   issueCardDragging: {
      opacity: 0.5,
      transform: 'rotate(5deg)',
   },

   issueHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '8px',
   },

   issueId: {
      fontSize: '12px',
      fontWeight: 'bold',
      color: '#666',
   },

   priorityIndicator: {
      display: 'inline-block',
      width: '12px',
      height: '12px',
      borderRadius: '50%',
   },

   issueTitle: {
      margin: '0 0 8px 0',
      fontSize: '14px',
      color: '#333',
      fontWeight: '500',
      lineHeight: '1.4',
   },

   issueFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '12px',
      color: '#666',
   },

   issueMetadata: {
      marginTop: '8px',
      fontSize: '12px',
      color: '#666',
   },

   issueCreatedDate: {
      marginBottom: '6px',
      fontWeight: '500',
   },

   tagsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '4px',
      alignItems: 'center',
   },

   tagsLabel: {
      marginRight: '6px',
      fontWeight: '600',
      color: '#555',
   },

   tagItem: {
      backgroundColor: '#f8f9ff',
      color: '#4c63d2',
      padding: '3px 8px',
      borderRadius: '16px',
      fontSize: '10px',
      fontWeight: '600',
      border: '1px solid #e1e5ff',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.5px',
   },

   moveButton: {
      marginTop: '8px',
      width: '100%',
      padding: '6px 12px',
      fontSize: '12px',
      backgroundColor: '#1890ff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: '500',
      transition: 'background-color 0.2s ease',
   },

   loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '400px',
      fontSize: '18px',
      color: '#666',
   },

   // Sidebar Styles
   sidebar: {
      marginTop: '20px',
   },

   sidebarTitle: {
      fontSize: '16px',
      fontWeight: 600,
      color: 'var(--color-gray-900, #111827)',
      marginBottom: '16px',
   },

   // Recently Visited Issues Styles
   recentlyVisitedContainer: {
      marginBottom: '24px',
   },

   recentlyVisitedTitle: {
      fontSize: '16px',
      fontWeight: 600,
      color: 'var(--color-gray-900, #111827)',
      marginBottom: '12px',
      margin: 0,
   },

   recentlyVisitedList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
   },

   recentlyVisitedItem: {
      padding: '12px',
      borderRadius: '6px',
   },

   recentlyVisitedItemHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '4px',
   },

   recentlyVisitedItemId: {
      fontSize: '12px',
      fontWeight: 600,
      color: 'var(--color-primary, #3b82f6)',
   },

   recentlyVisitedItemTime: {
      fontSize: '11px',
      color: 'var(--color-gray-500, #6b7280)',
   },

   recentlyVisitedItemTitle: {
      fontSize: '14px',
      fontWeight: 500,
      color: 'var(--color-gray-900, #111827)',
      margin: 0,
      lineHeight: 1.3,
   },

   recentlyVisitedItemStatus: {
      fontSize: '11px',
      color: 'var(--color-gray-600, #4b5563)',
      marginTop: '4px',
      textTransform: 'capitalize',
   },

   recentlyVisitedEmpty: {
      padding: '16px',
      textAlign: 'center',
      color: 'var(--color-gray-500, #6b7280)',
      fontSize: '14px',
   },
};
