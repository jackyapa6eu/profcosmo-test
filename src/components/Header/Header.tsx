import { observer } from 'mobx-react';
import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Popover } from 'antd';
import { HeaderContainer, HeaderLogo } from './styles';
import Logo from '../../assets/logo.png';
import authStore from '../../stores/AuthStore';

const Header = observer(() => {
  const { user, logOutUser } = authStore;
  const location = useLocation();
  const isLoginPage = useMemo(() => location.pathname === '/login', [location]);

  return (
    <HeaderContainer>
      <Link to='/'>
        <HeaderLogo src={Logo} alt='logo' />
      </Link>
      {user && (
        <Popover
          content={
            <Button size='small' onClick={logOutUser}>
              Выйти
            </Button>
          }
          trigger='click'
        >
          <Button size='small'>{user.email}</Button>
        </Popover>
      )}
      {!user && !isLoginPage && (
        <Link to='/login'>
          <Button size='small'>Вход</Button>
        </Link>
      )}
    </HeaderContainer>
  );
});

export default Header;
