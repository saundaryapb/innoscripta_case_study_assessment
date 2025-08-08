import React, { useState } from 'react';
import { CustomInputText, CustomDropdown, CustomButton } from '../../../shared/components';
import { Assignee, Priority } from '../../../shared/constants';
import { boardStyles } from './styles';

const Filter: React.FC = () => {
   const [searchValue, setSearchValue] = useState('');
   const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);
   const [selectedSeverities, setSelectedSeverities] = useState<string[]>([]);

   const assigneeOptions = Object.values(Assignee).map((assignee) => ({
      value: assignee,
      label: assignee.charAt(0).toUpperCase() + assignee.slice(1),
   }));

   const severityOptions = Object.values(Priority).map((priority) => ({
      value: priority,
      label: priority.charAt(0).toUpperCase() + priority.slice(1),
   }));

   const handleClearFilters = () => {
      setSearchValue('');
      setSelectedAssignees([]);
      setSelectedSeverities([]);
   };

   return (
      <div style={boardStyles.filterContainer}>
         <div style={boardStyles.filterRow}>
            {/* Search Input */}
            <div style={boardStyles.filterField}>
               <CustomInputText
                  label="Search Issues"
                  placeholder="Search by title, description..."
                  value={searchValue}
                  handleChange={(e) => setSearchValue(e.target.value)}
               />
            </div>

            {/* Assignees Dropdown */}
            <div style={boardStyles.filterFieldSmall}>
               <CustomDropdown
                  label="Assignees"
                  multiple
                  value={selectedAssignees}
                  options={assigneeOptions}
                  handleChange={(value) => setSelectedAssignees(value as string[])}
               />
            </div>

            {/* Severities Dropdown */}
            <div style={boardStyles.filterFieldSmall}>
               <CustomDropdown
                  label="Priorities"
                  multiple
                  value={selectedSeverities}
                  options={severityOptions}
                  handleChange={(value) => setSelectedSeverities(value as string[])}
               />
            </div>

            <div style={{ marginBottom: '5px' }}>
               <CustomButton label="Clear Filters" variant="secondary" handleClick={handleClearFilters} />
            </div>
         </div>
      </div>
   );
};

export default Filter;
