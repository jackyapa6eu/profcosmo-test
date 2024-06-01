import React, { useMemo } from 'react';
import { Button, Form, Input, message } from 'antd';
import { observer } from 'mobx-react';
import { StyledForm, StyledFormItem } from './styles';
import { formRules } from '../../utils/consts';
import authStore from '../../stores/AuthStore';

const SignInForm = observer(() => {
  const [form] = Form.useForm();

  const { requiredRule, passMatch } = formRules;
  const { signInUser, setUser, signInUserLoadingStatus } = authStore;

  const isLoading = useMemo(() => signInUserLoadingStatus === 'loading', [signInUserLoadingStatus]);

  const handleSubmit = async (values: any) => {
    const { email, password } = values;

    try {
      const user = await signInUser({ email, password });
      setUser(user);
      message.success('Успешно.');
    } catch (e: unknown) {
      message.error('Пользователь не найден или неверный пароль.');
    }
  };

  return (
    <StyledForm
      onFinish={handleSubmit}
      form={form}
      layout='vertical'
      variant='filled'
      disabled={isLoading}
    >
      <StyledFormItem
        name='email'
        label='Email'
        rules={[requiredRule, { type: 'email', message: 'Введите email' }]}
      >
        <Input size='small' />
      </StyledFormItem>
      <StyledFormItem name='password' label='Пароль' rules={[requiredRule]}>
        <Input.Password size='small' type='password' />
      </StyledFormItem>
      <StyledFormItem
        name='repeatPassword'
        label='Повторите пароль'
        dependencies={['password']}
        rules={[requiredRule, passMatch]}
      >
        <Input.Password size='small' type='password' />
      </StyledFormItem>
      <Button loading={isLoading} htmlType='submit'>
        Войти
      </Button>
    </StyledForm>
  );
});

export default SignInForm;
