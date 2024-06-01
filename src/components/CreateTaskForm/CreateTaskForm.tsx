import React from 'react';
import { observer } from 'mobx-react';
import { Button, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { FormTitle, StyledForm, StyledFormItem, SubmitButtonContainer } from './styles';
import { formRules } from '../../utils/consts';
import tasksStore from '../../stores/TasksStore';

const CreateTaskForm = observer(() => {
  const [form] = Form.useForm();
  const { requiredRule, min, max } = formRules;

  const { createTask } = tasksStore;

  const handleSubmit = async (values: any) => {
    const { name, author, text } = values;

    await createTask({ name, author, text });
    form.resetFields();
  };

  return (
    <StyledForm onFinish={handleSubmit} form={form} layout='vertical' variant='filled'>
      <FormTitle>Создать задачу</FormTitle>
      <StyledFormItem
        name='name'
        gridarea='name'
        label='Название'
        rules={[requiredRule, min(5), max(25)]}
      >
        <Input size='small' />
      </StyledFormItem>
      <StyledFormItem
        name='author'
        gridarea='author'
        label='Автор'
        rules={[formRules.requiredRule, { type: 'email', message: 'Введите email пользователя' }]}
      >
        <Input size='small' type='text' />
      </StyledFormItem>
      <StyledFormItem name='text' gridarea='text' label='Текст'>
        <TextArea size='small' rows={2} />
      </StyledFormItem>
      <SubmitButtonContainer>
        <Button htmlType='submit'>Создать</Button>
      </SubmitButtonContainer>
    </StyledForm>
  );
});

export default CreateTaskForm;
