import "./style.css";
import "./forced-colors-fix.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import { Leva } from "leva";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";

// 懒加载组件

// 创建一个包装器组件来监视加载状态
function AppWrapper({ children }) {
  useEffect(() => {
    // 当组件挂载时通知加载器
    if (window.notifyAppReady) {
      window.notifyAppReady();
    }
  }, []);

  return <>{children}</>;
}

const root = ReactDOM.createRoot(document.querySelector("#root"));

// 当所有资源加载完成时隐藏加载动画
window.addEventListener('load', () => {
  const loadingElement = document.getElementById('loading');
  if (loadingElement) {
    loadingElement.classList.add('hidden');
    // 动画完成后移除元素
    setTimeout(() => {
      loadingElement.style.display = 'none';
    }, 500);
  }
});

root.render(
  <AppWrapper>
    <Router>
      <Leva />
      <Routes>
        <Route
          path="/"
          element={
            <Canvas
              className="r3f"
              camera={{
                fov: 45,
                near: 0.1,
                far: 2000,
                position: [-3, 1.5, 4],
              }}
            >
              <Experience />
            </Canvas>
          }
        />
        <Route path="/new" element={
          <Suspense fallback={<div>Loading...</div>}>
          </Suspense>
        } />
      </Routes>
    </Router>
  </AppWrapper>
);
