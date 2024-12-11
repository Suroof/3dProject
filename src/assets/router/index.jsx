import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loading from '../components/Loading';

// 添加错误边界组件
const ErrorBoundary = ({ children }) => {
  return (
    <React.Suspense fallback={<Loading />}>
      {children}
    </React.Suspense>
  );
};

// 使用 lazy 导入组件
const Home = lazy(() => import('../pages/Home'));
const Chat = lazy(() => import('../pages/Chat'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));

function Router() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default Router;
