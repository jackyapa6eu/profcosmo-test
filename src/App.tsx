import React, { useEffect } from 'react';
import './vendor/normalize.css';
import './styles.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { observer } from 'mobx-react';
import authStore from './stores/AuthStore';
import Header from './components/Header';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';

const App = observer(() => {
  const { getUserFromLocalStorage, user } = authStore;

  useEffect(() => {
    getUserFromLocalStorage();
  }, []);

  return (
    <Router>
      <div className='app'>
        <Header />

        <div className='app-content'>
          <Routes>
            <Route
              path='/login'
              element={<ProtectedRoute component={LoginPage} condition={!user} redirectTo='/' />}
            />
            <Route
              path='/'
              element={
                <ProtectedRoute component={MainPage} condition={!!user} redirectTo='/login' />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
});

export default App;
