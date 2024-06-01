import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  component: React.ComponentType<any>;
  condition: boolean;
  redirectTo: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  condition,
  redirectTo,
}) => (condition ? <Component /> : <Navigate to={redirectTo} />);

export default ProtectedRoute;
