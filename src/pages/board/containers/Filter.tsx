import React, { useCallback, useMemo } from 'react';
import { FilterComponent } from '../components';
import { useBoardContext } from '../context';
import { FILTER_HANDLE_CHANGE_ACTIONS, BOARD_ACTION_TYPES } from '../constants';
import { Assignee, Priority } from '../../../shared/constants';
import { createOptionsFromEnum } from '../helpers';

type BoardDataKey = 'issueSearched' | 'selectedAssignees' | 'selectedSeverities';

const Filter: React.FC = () => {
   const { state, dispatch } = useBoardContext();
   const { data } = state;

   const assigneeOptions = useMemo(() => createOptionsFromEnum(Assignee), []);
   const severityOptions = useMemo(() => createOptionsFromEnum(Priority), []);

   const handleChange = useCallback(
      (actionType: string, value?: any) => {
         if (actionType === FILTER_HANDLE_CHANGE_ACTIONS.CLEAR_FILTERS) {
            dispatch({ type: BOARD_ACTION_TYPES.CLEAR_FILTERS });
            return;
         }
         dispatch({
            type: BOARD_ACTION_TYPES.UPDATE_DATA,
            key: actionType as BoardDataKey,
            payload: value,
         });
      },
      [dispatch]
   );

   return (
      <FilterComponent
         handleChange={handleChange}
         searchValue={data.issueSearched || ''}
         selectedAssignees={data.selectedAssignees || []}
         selectedSeverities={data.selectedSeverities || []}
         assigneeOptions={assigneeOptions}
         severityOptions={severityOptions}
      />
   );
};

export default Filter;
