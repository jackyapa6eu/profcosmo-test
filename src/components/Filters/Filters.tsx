import React, { useEffect, useMemo } from 'react';
import { observer } from 'mobx-react';
import { Button, Form, Select } from 'antd';
import { FiltersContainer, SelectsContainer, FormTitle } from './styles';
import tasksStore from '../../stores/TasksStore';
import SortButton from '../SortButton';
// по названию задачи, email, статусу и сортировки по ID

const Filters = observer(() => {
  const { filtersOptions, handleFilterSelect } = tasksStore;

  const statusOptions = useMemo(
    () => [
      { value: false, label: 'не выполнена' },
      { value: true, label: 'выполнена' },
    ],
    []
  );

  const handleSelect = (field: string, value: string | boolean) => {
    handleFilterSelect(field, value);
  };

  return (
    <FiltersContainer>
      <FormTitle>Фильтрация</FormTitle>
      <SelectsContainer layout='vertical' variant='filled'>
        <Form.Item label='Название'>
          <Select
            options={filtersOptions.name}
            showSearch
            onChange={(value) => handleSelect('name', value)}
            allowClear
          />
        </Form.Item>

        <Form.Item label='Автор'>
          <Select
            options={filtersOptions.author}
            showSearch
            onChange={(value) => handleSelect('author', value)}
            allowClear
          />
        </Form.Item>
        <Form.Item label='Статус'>
          <Select
            options={statusOptions}
            onChange={(value) => handleSelect('done', value)}
            allowClear
          />
        </Form.Item>
      </SelectsContainer>

      <SortButton />
    </FiltersContainer>
  );
});

export default Filters;
