[Mine Laptop](https://3dcool.netlify.app/)
![image](https://github.com/user-attachments/assets/d94997bf-f6b4-47d8-b2ad-569c16fb8cdb)

项目预览

📖 项目概述
这是一个基于React和Three.js的交互式3D网站项目，展示了一个可拖动的3D场景，包含MacBook、iPhone和仙人掌模型。项目特点是流畅的3D交互体验、精美的光影效果以及响应式设计。

✨ 主要特点
🖥️ 交互式3D MacBook模型，屏幕上显示实时网页
📱 3D iPhone模型，可自定义屏幕内容
🌵 可点击的仙人掌模型，用于页面导航
🎵 背景音乐自动播放功能
🔄 流畅的加载动画
📱 移动设备优化，支持触摸操作
🎨 精美的光照和环境贴图
🛠️ 技术栈
React
Three.js
React Three Fiber / Drei
React Router
Vite
📦 安装说明
克隆项目到本地
git clone https://github.com/yourusername/3dProject.git  
cd 3dProject
安装依赖
npm install
启动开发服务器
npm run dev
打开浏览器访问 http://localhost:5173
🚀 构建部署
npm run build
构建后的文件将生成在 dist 目录下。 vite.config.js:34-38

📁 项目结构
src/  
├── assets/           # 静态资源（图片、音频等）  
├── components/       # React组件  
├── pages/            # 页面组件  
├── shaders/          # 自定义着色器  
├── Experience.jsx    # 主要3D场景组件  
├── NewComponent.jsx  # 新页面组件  
├── index.html        # HTML模板  
├── index.jsx         # 应用入口  
└── style.css         # 全局样式  
💻 核心功能实现
3D模型渲染与交互
项目使用React Three Fiber和Drei库渲染和控制3D模型，提供了流畅的拖放和旋转体验。 Experience.jsx:157-243

网页嵌入显示
MacBook和iPhone模型的屏幕上分别嵌入了网页内容，通过HTML组件实现。 Experience.jsx:190-198 Experience.jsx:212-226

背景音乐
项目包含自动播放的背景音乐功能，通过用户交互触发。 Experience.jsx:100-141

加载动画
网站加载时显示精美的加载动画，提升用户体验。 index.html:9-37 index.jsx:14-23

🖼️ 模型和资源
项目使用了以下外部资源：
MacBook模型 来自pmnd免费模型

