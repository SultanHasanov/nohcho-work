import { Route, Routes } from 'react-router-dom';

import { PlainLayout } from '@/components/layout/PlainLayout';
import { RequireAuth } from '@/components/layout/RequireAuth';
import { TabsLayout } from '@/components/layout/TabsLayout';
import AdsPage from '@/pages/Ads';
import ChatPage from '@/pages/Chat';
import ChatsPage from '@/pages/Chats';
import CreateAdPage from '@/pages/CreateAd';
import CreateOrderPage from '@/pages/CreateOrder';
import FavoritesPage from '@/pages/Favorites';
import HomePage from '@/pages/Home';
import LegalPage from '@/pages/Legal';
import LoginPage from '@/pages/Login';
import MyOrdersPage from '@/pages/MyOrders';
import NotFoundPage from '@/pages/NotFound';
import NotificationsPage from '@/pages/Notifications';
import OrderDetailPage from '@/pages/OrderDetail';
import OrderPublishedPage from '@/pages/OrderPublished';
import OrderSentPage from '@/pages/OrderSent';
import PhoneCodePage from '@/pages/PhoneCode';
import PhoneLoginPage from '@/pages/PhoneLogin';
import ProfilePage from '@/pages/Profile';
import ResponsesPage from '@/pages/Responses';
import ReviewsPage from '@/pages/Reviews';
import RolePage from '@/pages/Role';
import SettingsPage from '@/pages/Settings';

export function App() {
  return (
    <Routes>
      <Route element={<PlainLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/phone" element={<PhoneLoginPage />} />
        <Route path="/login/code" element={<PhoneCodePage />} />
        <Route path="/legal/:doc" element={<LegalPage />} />
        <Route element={<RequireAuth />}>
          <Route path="/role" element={<RolePage />} />
          <Route path="/orders/new" element={<CreateOrderPage />} />
          <Route path="/orders/:orderId/sent" element={<OrderSentPage />} />
          <Route path="/orders/:orderId/published" element={<OrderPublishedPage />} />
          <Route path="/ads/new" element={<CreateAdPage />} />
          <Route path="/chats/:chatId" element={<ChatPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/responses" element={<ResponsesPage />} />
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
