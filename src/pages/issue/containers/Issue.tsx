import React, { useCallback } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { ISSUE_HANDLE_CHANGE_ACTIONS } from '../constants';
import IssueComponent from '../components';

const Issue: React.FC = () => {
   const { id } = useParams<{ id: string }>();
   const location = useLocation();
   const navigate = useNavigate();
   const data = location.state?.data;

   const handleChange = useCallback(
      (actionType: string, payload?: any) => {
         switch (actionType) {
            case ISSUE_HANDLE_CHANGE_ACTIONS.NAVIGATE_BACK:
               navigate(-1);
               break;

            default:
               console.warn('Unknown action type:', actionType);
         }
      },
      [navigate]
   );

   return <IssueComponent data={data} issueId={id} handleChange={handleChange} />;
};

export default Issue;
