import React from 'react';
import { CustomInputText, CustomDropdown, CustomButton } from '../../../shared/components';
import { boardStyles } from './styles';
import { FILTER_HANDLE_CHANGE_ACTIONS } from '../constants';

interface FilterProps {
   handleChange: (actionType: string, value?: any) => void;
   searchValue: string;
   selectedAssignees: string[];
   selectedSeverities: string[];
   assigneeOptions: { value: string; label: string }[];
   severityOptions: { value: string; label: string }[];
}

const Filter: React.FC<FilterProps> = ({
   handleChange,
   searchValue,
   selectedAssignees,
   selectedSeverities,
   assigneeOptions,
   severityOptions,
}) => {
   return (
      <div style={boardStyles.filterContainer}>
         <div style={boardStyles.filterRow}>
            <div style={boardStyles.filterField}>
               <CustomInputText
                  label="Search Issues"
                  placeholder="Search by title, description..."
                  value={searchValue}
                  handleChange={(e) => handleChange(FILTER_HANDLE_CHANGE_ACTIONS.SEARCH_ISSUES, e.target.value)}
               />
            </div>

            <div style={boardStyles.filterFieldSmall}>
               <CustomDropdown
                  label="Assignees"
                  multiple
                  value={selectedAssignees}
                  options={assigneeOptions}
                  handleChange={(value) => handleChange(FILTER_HANDLE_CHANGE_ACTIONS.SET_ASSIGNEES, value)}
               />
            </div>

            <div style={boardStyles.filterFieldSmall}>
               <CustomDropdown
                  label="Priorities"
                  multiple
                  value={selectedSeverities}
                  options={severityOptions}
                  handleChange={(value) => handleChange(FILTER_HANDLE_CHANGE_ACTIONS.SET_SEVERITIES, value)}
               />
            </div>

            <div style={{ marginBottom: '5px' }}>
               <CustomButton
                  label="Clear Filters"
                  variant="secondary"
                  handleClick={() => handleChange(FILTER_HANDLE_CHANGE_ACTIONS.CLEAR_FILTERS)}
               />
            </div>
         </div>
      </div>
   );
};

export default Filter;
