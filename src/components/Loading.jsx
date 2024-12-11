import React from 'react';
import { Spin } from 'antd';

const Loading = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'rgba(255, 255, 255, 0.8)',
      zIndex: 9999
    }}>
      <Spin size="large" tip="加载中..." />
    </div>
  );
};

export default Loading;
