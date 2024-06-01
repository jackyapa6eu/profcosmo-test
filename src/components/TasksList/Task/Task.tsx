import React, { useState, ChangeEvent, useMemo } from 'react';
import { observer } from 'mobx-react';
import { Button } from 'antd';
import type { CheckboxProps } from 'antd';
import tasksStore, { ITask } from '../../../stores/TasksStore';

import { TaskContainer, TaskItem, StyledText, StyledTextArea, StyledCheckbox } from './styles';
import authStore from '../../../stores/AuthStore';

interface ITaskProps {
  task: ITask;
}

const Task: React.FC<ITaskProps> = observer(({ task }) => {
  const [isEditing, setEditing] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState(task.text);
  const [checkBoxValue, setCheckBoxValue] = useState(task.done);

  const { user } = authStore;
  const { editTask } = tasksStore;

  const isAdmin = useMemo(() => user?.role === 'admin', [user]);

  const handleEditButton = () => setEditing(true);

  const onChange: CheckboxProps['onChange'] = (event) => {
    setCheckBoxValue(event.target.checked);
  };

  const handleSubmitTask = () => {
    const resultTask = { ...task, done: checkBoxValue, text: textAreaValue };
    editTask(resultTask);
    setEditing(false); // после изменения
  };

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(event.target.value);
  };

  return (
    <TaskContainer>
      <TaskItem $gridarea='name' $align='start'>
        <h4 style={{ margin: 0 }}>
          <span>{task.id}. </span>
          {task.name}
        </h4>
      </TaskItem>
      <TaskItem $gridarea='status' $align='start' $justify='end'>
        {isEditing ? (
          <StyledCheckbox checked={checkBoxValue} onChange={onChange}>
            выполнена
          </StyledCheckbox>
        ) : (
          <StyledText>{task.done ? 'выполнена' : 'Не выполнена'}</StyledText>
        )}
      </TaskItem>
      <TaskItem $gridarea='text'>
        {isEditing ? (
          <StyledTextArea value={textAreaValue} onChange={handleTextChange} autoSize />
        ) : (
          <StyledText>{task.text}</StyledText>
        )}
      </TaskItem>
      <TaskItem $gridarea='author'>{task.author}</TaskItem>
      <TaskItem $gridarea='button' $justify='end'>
        {isAdmin &&
          (isEditing ? (
            <Button size='small' htmlType='submit' onClick={handleSubmitTask}>
              Сохранить
            </Button>
          ) : (
            <Button size='small' onClick={handleEditButton}>
              Изменить
            </Button>
          ))}
      </TaskItem>
    </TaskContainer>
  );
});

export default Task;
