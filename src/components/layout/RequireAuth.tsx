import { observer } from 'mobx-react-lite';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useStores } from '@/stores/context';

/** Без сессии — на вход, с сессией но без роли — на выбор роли. */
export const RequireAuth = observer(function RequireAuth() {
  const { session } = useStores();
  const location = useLocation();

  if (session.isRestoring) {
    return <div className="flex-1" aria-busy="true" />;
  }
  if (!session.isAuthorized) {
    return <Navigate to="/login" replace />;
  }
  if (!session.hasRole && location.pathname !== '/role') {
    return <Navigate to="/role" replace />;
  }
  return <Outlet />;
});
