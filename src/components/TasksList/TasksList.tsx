import React, { useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import { Pagination } from 'antd';
import tasksStore from '../../stores/TasksStore';
import Task from './Task';
import { TasksContainer, ListContainer, PaginationContainer, TasksItems } from './styles';

const pageSize = 3;

const TasksList = observer(() => {
  const [currentPage, setCurrentPage] = useState(1);
  const { filteredTasks, sortOrder } = tasksStore;

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedTasks = useMemo(() => {
    const currentIndex = currentPage - 1;
    const offset = currentIndex * pageSize;
    return filteredTasks.slice(offset, offset + pageSize);
  }, [filteredTasks, currentPage, sortOrder]);

  return (
    <TasksContainer>
      <ListContainer>
        <TasksItems>
          {paginatedTasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
          {!filteredTasks.length && <p>По вашему запросу ничего не найдено</p>}
        </TasksItems>
      </ListContainer>

      <PaginationContainer>
        <Pagination
          defaultCurrent={currentPage}
          total={filteredTasks.length}
          pageSize={pageSize}
          onChange={handleChangePage}
        />
      </PaginationContainer>
    </TasksContainer>
  );
});

export default TasksList;
