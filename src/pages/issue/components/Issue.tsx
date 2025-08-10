import React from 'react';
import { Issue as IssueType } from '../../../types';
import { CustomButton, CustomCard } from '../../../shared/components';
import { ISSUE_HANDLE_CHANGE_ACTIONS, ISSUE_STATUS } from '../constants';
import { getPriorityColor, getPriorityLabel, generateIssueDetails } from '../helpers';
import { isAdminUser } from '../../board/helpers';
import { issueStyles } from './styles';

interface IssueProps {
   data?: IssueType;
   issueId?: string;
   user?: any;
   handleChange: (actionType: string, payload?: any) => void;
}

const Issue: React.FC<IssueProps> = ({ data, issueId, user, handleChange }) => {
   if (!data) {
      return (
         <div style={issueStyles.notFoundContainer}>
            <h1>Issue Not Found</h1>
            <p>The issue with ID "{issueId}" could not be found.</p>
         </div>
      );
   }

   const DetailItem: React.FC<{ title: string; value: string | number }> = ({ title, value }) => (
      <div>
         <h4 style={issueStyles.detailItem}>{title}</h4>
         <p style={issueStyles.detailValue}>{value}</p>
      </div>
   );

   const issueDetails = generateIssueDetails(data);

   return (
      <div style={issueStyles.container}>
         <div style={issueStyles.backButtonContainer}>
            <CustomButton
               handleClick={() => handleChange(ISSUE_HANDLE_CHANGE_ACTIONS.NAVIGATE_BACK)}
               variant="primary"
               label="← Back to Board"
            />
         </div>

         <CustomCard style={issueStyles.issueCard}>
            <div style={issueStyles.issueHeader}>
               <h1 style={issueStyles.issueId}>#{data.id}</h1>
               <span
                  style={{
                     ...issueStyles.priorityBadge,
                     backgroundColor: getPriorityColor(data.priority),
                  }}
               >
                  {getPriorityLabel(data.priority)}
               </span>
               <span style={issueStyles.statusBadge}>{data.status}</span>
            </div>

            <h2 style={issueStyles.issueTitle}>{data.title}</h2>

            <div style={issueStyles.descriptionSection}>
               <h3 style={issueStyles.sectionTitle}>Description</h3>
               <p style={issueStyles.descriptionText}>{data.description}</p>
            </div>

            <div style={issueStyles.detailsGrid}>
               {issueDetails.map((detail, index) => (
                  <DetailItem key={index} title={detail.title} value={detail.value} />
               ))}
            </div>

            <div>
               <h4 style={issueStyles.sectionTitle}>Tags</h4>
               <div style={issueStyles.tagsContainer}>
                  {data.tags.map((tag, index) => (
                     <span key={index} style={issueStyles.tagItem}>
                        {tag}
                     </span>
                  ))}
               </div>
            </div>

            {isAdminUser(user) && data.status !== ISSUE_STATUS.DONE && (
               <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
                  <CustomButton
                     handleClick={() =>
                        handleChange(ISSUE_HANDLE_CHANGE_ACTIONS.MARK_AS_RESOLVED, { issueId: data.id })
                     }
                     variant="primary"
                     label="Mark as Resolved"
                  />
               </div>
            )}
         </CustomCard>
      </div>
   );
};

export default Issue;
