import React from 'react';
import { observer } from 'mobx-react';
import CreateTaskForm from '../../components/CreateTaskForm';
import TasksList from '../../components/TasksList';
import Filters from '../../components/Filters';
import { MainPageContainer } from './styles';

const MainPage: React.FC = observer(() => (
  <MainPageContainer>
    <CreateTaskForm />
    <Filters />
    <TasksList />
  </MainPageContainer>
));

export default MainPage;
