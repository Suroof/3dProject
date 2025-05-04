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
      background: 'rgba(0, 0, 0, 0.7)',
      zIndex: 9999,
      color: 'white'
    }}>
      <div style={{ textAlign: 'center' }}>
        <Spin size="large" />
        <div style={{ marginTop: '20px', fontSize: '18px' }}>
          3D 资源加载中，请稍候...
        </div>
      </div>
    </div>
  );
};

export default Loading;