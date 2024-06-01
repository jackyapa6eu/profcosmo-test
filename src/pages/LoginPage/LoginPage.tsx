import React from 'react';
import SignInForm from '../../components/SignInForm';
import { LoginPageContainer } from './styles';

const LoginPage: React.FC = () => {
  const x = '';
  return (
    <LoginPageContainer>
      <SignInForm />
    </LoginPageContainer>
  );
};

export default LoginPage;
