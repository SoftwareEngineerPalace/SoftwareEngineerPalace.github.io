import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // 设置 index.html 缓存为 no-cache
        headers: {
          "Cache-Control": "no-cache",
        },
      },
    },
  },
  server: {
    // 是否开启 https
    https: false,
    // 端口号
    port: 3000,
    strictPort: true,
    // 监听所有地址
    host: "0.0.0.0",
    // 服务启动时是否自动打开浏览器
    open: true,
    // 允许跨域
    cors: true,
    // 自定义代理规则
    proxy: {
      "/api": {
        target: "http://39.107.119.92:3000/",
        changeOrigin: true, // 是否允许跨域
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
});
