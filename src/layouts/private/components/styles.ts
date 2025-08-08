export const headerStyles = {
   header: {
      padding: '1rem',
      borderBottom: '1px solid #e0e0e0',
      backgroundColor: '#f8f9fa',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   title: {
      margin: 0,
      fontSize: '1.5rem',
      color: '#333',
   },
   rightSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
   },
   userCard: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'flex-end',
      backgroundColor: '#ffffff',
      padding: '0.5rem 1rem',
      borderRadius: '8px',
      border: '1px solid #e0e0e0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
   },
   userCardHover: {
      backgroundColor: '#f0f0f0',
      boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
      transform: 'translateY(-1px)',
   },
   userName: {
      fontWeight: 'bold' as const,
      color: '#333',
      fontSize: '0.9rem',
      margin: 0,
   },
   userRole: {
      color: '#666',
      fontSize: '0.75rem',
      margin: 0,
      marginTop: '2px',
   },
   logoutButton: {
      padding: '0.5rem 1rem',
      fontSize: '0.875rem',
      borderRadius: '6px',
   },
};

export const chipStyles = {
   container: {
      display: 'inline-flex',
      alignItems: 'center',
      backgroundColor: '#e3f2fd',
      border: '1px solid #bbdefb',
      borderRadius: '16px',
      padding: '4px 12px',
      fontSize: '0.75rem',
      fontWeight: '500',
      color: '#1976d2',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
   },
   containerHover: {
      backgroundColor: '#bbdefb',
      transform: 'scale(1.02)',
   },
};
