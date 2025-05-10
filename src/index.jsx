// import "./style.css";
// import "./forced-colors-fix.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import { Leva } from "leva";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.querySelector("#root"));

// 解决移动设备上拖动模型时可能出现的手势问题。通过给Canvas组件添加一个CSS类名（如r3f），可以应用touch-action: none样式，从而禁用默认的触摸行为，使模型更容易拖动

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
    </Routes>
  </Router>
);
