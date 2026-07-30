import { Route, Routes } from 'react-router-dom';

import { PlainLayout } from '@/components/layout/PlainLayout';
import { RequireAuth } from '@/components/layout/RequireAuth';
import { TabsLayout } from '@/components/layout/TabsLayout';
import AdsPage from '@/pages/Ads';
import ChatPage from '@/pages/Chat';
import ChatsPage from '@/pages/Chats';
import CreateAdPage from '@/pages/CreateAd';
import CreateOrderPage from '@/pages/CreateOrder';
import HomePage from '@/pages/Home';
import LegalPage from '@/pages/Legal';
import LoginPage from '@/pages/Login';
import MyOrdersPage from '@/pages/MyOrders';
import NotFoundPage from '@/pages/NotFound';
import OrderDetailPage from '@/pages/OrderDetail';
import PhoneLoginPage from '@/pages/PhoneLogin';
import ProfilePage from '@/pages/Profile';
import RolePage from '@/pages/Role';

export function App() {
  return (
    <Routes>
      <Route element={<PlainLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/phone" element={<PhoneLoginPage />} />
        <Route path="/legal/:doc" element={<LegalPage />} />
        <Route element={<RequireAuth />}>
          <Route path="/role" element={<RolePage />} />
          <Route path="/orders/new" element={<CreateOrderPage />} />
          <Route path="/ads/new" element={<CreateAdPage />} />
          <Route path="/chats/:chatId" element={<ChatPage />} />
        </Route>
      </Route>

      <Route element={<TabsLayout />}>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/orders/:orderId" element={<OrderDetailPage />} />
          <Route path="/my-orders" element={<MyOrdersPage />} />
          <Route path="/ads" element={<AdsPage />} />
          <Route path="/chats" element={<ChatsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
