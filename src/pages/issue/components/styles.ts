export const issueStyles = {
   container: {
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto',
   } as React.CSSProperties,

   backButtonContainer: {
      marginBottom: '20px',
   } as React.CSSProperties,

   issueCard: {
      backgroundColor: '#f8f9fa',
      padding: '24px',
      borderRadius: '8px',
      border: '1px solid #dee2e6',
   } as React.CSSProperties,

   issueHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '16px',
   } as React.CSSProperties,

   issueId: {
      margin: 0,
      fontSize: '24px',
      color: '#333',
   } as React.CSSProperties,

   priorityBadge: {
      padding: '4px 12px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: 'bold',
      color: 'white',
   } as React.CSSProperties,

   statusBadge: {
      padding: '4px 12px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: 'bold',
      backgroundColor: '#6c757d',
      color: 'white',
   } as React.CSSProperties,

   issueTitle: {
      marginBottom: '16px',
      color: '#333',
   } as React.CSSProperties,

   descriptionSection: {
      marginBottom: '24px',
   } as React.CSSProperties,

   sectionTitle: {
      marginBottom: '8px',
      color: '#666',
   } as React.CSSProperties,

   descriptionText: {
      lineHeight: '1.6',
      color: '#333',
   } as React.CSSProperties,

   detailsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px',
      marginBottom: '24px',
   } as React.CSSProperties,

   detailItem: {
      marginBottom: '4px',
      color: '#666',
   } as React.CSSProperties,

   detailValue: {
      margin: 0,
      fontWeight: 'bold',
   } as React.CSSProperties,

   tagsContainer: {
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap',
   } as React.CSSProperties,

   tagItem: {
      padding: '4px 8px',
      backgroundColor: '#e9ecef',
      borderRadius: '4px',
      fontSize: '12px',
      color: '#495057',
   } as React.CSSProperties,

   notFoundContainer: {
      padding: '20px',
      textAlign: 'center',
   } as React.CSSProperties,
};
