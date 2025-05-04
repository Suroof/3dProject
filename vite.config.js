import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { transformWithEsbuild } from 'vite';
import restart from 'vite-plugin-restart';
import { resolve } from 'path';

export default defineConfig({
    base: './',
    root: 'src/',
    publicDir: '../public/',
    plugins: [
        // Restart server on static/public file change
        restart({ restart: ['../public/**'] }),

        // React support
        react(),

        // .js file support as if it was JSX
        {
            name: 'load+transform-js-files-as-jsx',
            async transform(code, id) {
                if (!id.match(/src\/.*\.js$/)) return null;

                return transformWithEsbuild(code, id, {
                    loader: 'jsx',
                    jsx: 'automatic',
                });
            },
        },
    ],
    server: {
        host: true, // Open to local network and display URL
        open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env), // Open if it's not a CodeSandbox
    },
    build: {
        outDir: '../dist', // Output in the dist/ folder
        emptyOutDir: true, // Empty the folder first
        sourcemap: true, // Add sourcemap
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        },
        rollupOptions: {
            output: {
                manualChunks: {
                    // 将 three.js 相关库拆分到单独的 chunk
                    three: ['three', '@react-three/fiber', '@react-three/drei', 'three-stdlib'],
                    // UI 框架单独拆分
                    vendor: ['react', 'react-dom', 'react-router-dom'],
                    // antd 拆分
                    antd: ['antd'],
                },
            },
        },
        // 预加载核心资源
        assetsInlineLimit: 4096,
        chunkSizeWarningLimit: 1000,
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
});
