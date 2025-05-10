import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { transformWithEsbuild } from "vite";
import restart from "vite-plugin-restart";
import viteCompression from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

export default defineConfig({
  base: "./",
  root: "src/",
  publicDir: "../public/",
  plugins: [
    restart({ restart: ["../public/**"] }),
    react(),
    {
      name: "load+transform-js-files-as-jsx",
      async transform(code, id) {
        if (!id.match(/src\/.*\.js$/)) return null;

        return transformWithEsbuild(code, id, {
          loader: "jsx",
          jsx: "automatic",
        });
      },
    },

    // gzip 压缩
    viteCompression({
      verbose: false, // 不输出压缩日志
      algorithm: "gzip",
      ext: ".gz",
      threshold: 10240, // 只有大于 10kb 的文件才会被压缩
    }),

    // brotli 压缩
    viteCompression({
      verbose: false,
      algorithm: "brotliCompress",
      ext: ".br",
      threshold: 10240,
    }),
    // 仅在分析模式下启用可视化工具
    process.env.ANALYZE &&
      visualizer({
        open: true, // 构建后自动打开分析报告
        gzipSize: true, // 显示 gzip 压缩后的大小
        brotliSize: true, // 显示 brotli 压缩后的大小
        filename: "dist/stats.html", // 分析报告输出路径
      }),
  ].filter(Boolean), // 过滤掉可能为假值的插件,
  server: {
    host: true,
    open: !("SANDBOX_URL" in process.env || "CODESANDBOX_HOST" in process.env), // Open if it's not a CodeSandbox
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    sourcemap: false, // 关闭生产环境的 sourcemap
    minify: "terser", // 使用 terser 而不是默认的 esbuild 压缩
    terserOptions: {
      compress: {
        drop_console: true, // 移除控制台日志
        drop_debugger: true, // 移除调试代码
        pure_funcs: ["console.log"], // 视为副作用函数并移除
      },
      output: {
        comments: false, // 删除注释
      },
    },
    rollupOptions: {
        output: {
            // 代码分割策略
            manualChunks: {
                'vendor': ['react', 'react-dom', 'react-router-dom'],
                'three-vendor': ['three', '@react-three/fiber', '@react-three/drei', 'three-stdlib'],
                'ui-vendor': ['antd', 'leva'],
            },
            // 自定义文件名格式
            chunkFileNames: 'assets/js/[name]-[hash].js',
            entryFileNames: 'assets/js/[name]-[hash].js',
            assetFileNames: (assetInfo) => {
                if (assetInfo.name.endsWith('.css')) {
                    return 'assets/css/[name]-[hash][extname]';
                }
                if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(assetInfo.name)) {
                    return 'assets/images/[name]-[hash][extname]';
                }
                if (/\.(woff2?|eot|ttf|otf)$/.test(assetInfo.name)) {
                    return 'assets/fonts/[name]-[hash][extname]';
                }
                return 'assets/[name]-[hash][extname]';
            }
        },
    },
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer,
        cssnano({
          preset: [
            "default",
            {
              discardComments: { removeAll: true },
              normalizeWhitespace: true,
              colormin: true,
              minifyFontValues: true,
              minifySelectors: true,
            },
          ],
        }),
      ],
    },
  },
  //预构建依赖项
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'three', '@react-three/fiber', '@react-three/drei'],
  },
});
