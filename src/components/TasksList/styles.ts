import styled from 'styled-components';

const TasksContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  grid-area: tasksList;
  width: 100%;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  //justify-content: center;
  gap: 6px;
  width: 100%;
  height: calc(100vh - 445px);
  overflow-y: auto;
  padding: 12px;
  @media screen and (max-width: 850px) {
    padding-top: 0;
    height: auto;
    overflow-y: auto;
  }
`;

const TasksItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  background: white;
`;

export { TasksContainer, ListContainer, PaginationContainer, TasksItems };
