import React from 'react';
import { observer } from 'mobx-react';
import SortIcon from '../../assets/sortIcon.png';
import { StyledButton, SortImg } from './styles';
import TasksStore from '../../stores/TasksStore';

const SortButton = observer(() => {
  const { handleSort, sortOrder } = TasksStore;

  return (
    <StyledButton onClick={handleSort}>
      <SortImg src={SortIcon} alt='sort button' $sortorder={sortOrder} />
    </StyledButton>
  );
});

export default SortButton;
